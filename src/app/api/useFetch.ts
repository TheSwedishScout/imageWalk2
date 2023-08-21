/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";

const sleep = (delay: string) =>
  new Promise((resolve) => setTimeout(resolve, parseInt(delay)));

class customError extends Error {
  status: number;
  constructor(status: number) {
    super();
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

const fetcher = async (url: string, method: string, body?: any) => {
  if (url === undefined) return;

  let response = new Response();
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const forceError = queryParams.get("forceError");
  if (forceError) {
    throw new customError(parseInt(forceError));
  }

  const delay = queryParams.get("delay");
  if (delay) {
    await sleep(delay);
  }

  if (queryParams.entries.length > 0) {
    response = await fetch(`${url}?${queryParams.toString()}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(`${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!response.ok) {
    throw new customError(response.status);
  }
  if (response.status === 200) {
    return response.json();
  } else {
    return;
  }
};

export const useFetch = (url: string) => {
  const { data, isLoading } = useSWR(url, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Don't retry on 400, 401, 404
      switch (error.status) {
        case 400:
          toast.error("Bad request.");
          return;
        case 401:
          toast.warning("Unauthorized.");
          return;
        case 404:
          toast.warning("Not found.");
          return;
        case 500:
          toast.error(
            "Internal server error. Retry number " + retryCount + " of 3"
          );
          break;
        default:
          if (error instanceof TypeError) {
            toast.error("Failed to fetch");
          } else if (error instanceof SyntaxError) {
            toast.error("The server response was not valid JSON.");
          }
          return;
      }

      // Only retry up to 3 times.
      if (retryCount >= 3) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const getById = async (url: string, id: number) => {
    const newData = await fetcher(url, "GET", id);

    return JSON.stringify(newData);
  };

  const post = async (url: string, body: any) => {
    const newData = await fetcher(url, "POST", body);
    mutate((prevData: any) => [...prevData, newData], false);
    toast.success("Data added successfully!");
    return JSON.stringify(newData);
  };

  const put = async (url: string, id: number, body: any) => {
    const updatedData = await fetcher(`${url}/${id}`, "PUT", body);
    mutate(
      url,
      (data: any) => {
        const newData = data.map((item: any) => {
          if (item.id === id) {
            return updatedData;
          }
          return item;
        });
        return newData;
      },
      false
    );

    toast.success("Data updated successfully!");
    return JSON.stringify(updatedData);
  };

  const remove = async (url: string, id: number) => {
    await fetcher(`${url}/${id}`, "DELETE");
    mutate(
      url,
      (data: any) => data.filter((item: any) => item.id !== id),
      false
    );
    toast.success("Data deleted successfully!");
  };

  return {
    data,
    isLoading,
    getById,
    post,
    put,
    remove,
  };
};
