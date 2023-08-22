import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useState, useRef } from "react";
import { ILocationImage, IPathInfo, MapTools } from "./NewMapWrapper";
import { LatLng, findClosestPosition } from "../lib/cordinates";
import { v4 as uuidv4 } from "uuid";

const containerStyle: React.CSSProperties = {
  width: "1200px",
  height: "800px",
};

const EditMap = ({
  tool,
  setPath,
  path,
  setImages,
  pathInfo,
  images,
}: {
  tool: MapTools;
  setPath: React.Dispatch<React.SetStateAction<LatLng[]>>;
  path: LatLng[];
  images: ILocationImage[];
  pathInfo: IPathInfo;
  setImages: React.Dispatch<React.SetStateAction<ILocationImage[]>>;
}) => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
  });
  const polylineRef = useRef<google.maps.Polyline | null | undefined>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const [, setMap] = useState<google.maps.Map | null | undefined>();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      });
      map.setZoom(13);
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleOnClick = (event: google.maps.MapMouseEvent) => {
    if (tool === "path") {
      if (event.latLng) {
        const newPath = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setPath((old) => [...old, newPath]);
      }
    }
    if (tool == "image") {
      if (event.latLng) {
        const pos = { lat: event.latLng.lat(), lng: event.latLng.lng() };

        // ----------------------------------------------------------
        // Move states to mapWrapper to make editabale location table
        // ----------------------------------------------------------

        // find closest location in path
        const closest = findClosestPosition(pos, path);
        if (closest) {
          if (
            !images.find(
              (image) => image.lat === closest.lat && image.lng === closest.lng
            )
          ) {
            setImages((images) => [
              ...images,
              {
                lat: closest.lat,
                lng: closest.lng,
                description: null,
                name: null,
                id: uuidv4(),
                image: "",
                pathId: pathInfo.id,
                height: null,
                width: null,
              },
            ]);
          }
        }

        // add image item (marker)
        // add image and text upload aria
      }
    }
  };
  const removeLocation = (image: Partial<ILocationImage>) => {
    if (image.lat && image.lng) {
      setImages((images) =>
        images.filter(
          (filtereImage) =>
            !(filtereImage.lat === image.lat && filtereImage.lng === image.lng)
        )
      );
    }
  };

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (tool == "path" && polylineRef.current) {
      const nextPath = polylineRef.current
        .getPath()
        .getArray()
        .map((latLng) => latLng.toJSON()) as LatLng[];
      setPath(nextPath);
    }
  }, [tool]);

  // Bind refs to current Polyline and listeners
  const onLoadPolyline = useCallback(
    (polyline: google.maps.Polyline) => {
      polylineRef.current = polyline;
      const path = polyline.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmountPolyline = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polylineRef.current = undefined;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleOnClick}
      clickableIcons={false}
    >
      <Polyline
        editable={tool == "path"}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={polylineRef}
        path={path}
        onMouseUp={onEdit}
        onLoad={onLoadPolyline}
        onUnmount={onUnmountPolyline}
      />
      {/* Child components, such as markers, info windows, etc. */}
      {images.map((image) => {
        return (
          <Marker
            key={`${image.lat}-${image.lng}`}
            position={{ lat: image.lat, lng: image.lng }}
            onRightClick={() => removeLocation(image)}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default EditMap;
