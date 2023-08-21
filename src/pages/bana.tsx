import { useFetch } from "@/app/api/useFetch";
import { Button, Card, Skeleton } from "@mui/material";
import { LocationImage, Path } from "@prisma/client";
import { useRouter } from "next/router";

interface MyPath extends Path {
  Images: LocationImage[];
  authur: {
    name: string | null;
  };
}
function Home() {
  const { data: paths, isLoading } = useFetch("/api/paths");
  const router = useRouter();
  if (isLoading) {
    return <Skeleton></Skeleton>;
  }
  return (
    <div>
      {paths.map((path: MyPath) => (
        <Card key={path.id}>
          <h1>{path.name}</h1>
          <Button onClick={() => router.push(`/Rutt/${path.id}`)}>Öppna</Button>
        </Card>
      ))}
    </div>
  );
}
export default Home;
