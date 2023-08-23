import {
  Circle,
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { LatLng, distanceToTarget } from "../lib/cordinates";
import { LocationImage } from "@prisma/client";

const DistanceToOpen = 0.02;

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "70vh",
};

const TrackMap = ({
  path,
  images,
  isFollow,
  currentSegment = 0,
  onCallbackCloseLocation,
  onCallbackLocationFar,
}: {
  isFollow: boolean;
  path: LatLng[][];
  images: LocationImage[];
  currentSegment: number;
  onCallbackCloseLocation: () => void;
  onCallbackLocationFar: () => void;
}) => {
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
  });
  const [map, setMap] = useState<google.maps.Map | null | undefined>();
  const [myLocation, setMyLocation] = useState<LatLng>();
  const [distance, setDistace] = useState<number>();

  useEffect(() => {
    let watchId: number | null = null;

    const startWatching = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setMyLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (isFollow && map) {
              map.setCenter({
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              });
            }
            setDistace(
              distanceToTarget(
                {
                  lng: position.coords.longitude,
                  lat: position.coords.latitude,
                },
                images[0]
              )
            );
            if (
              distanceToTarget(
                {
                  lng: position.coords.longitude,
                  lat: position.coords.latitude,
                },
                images[currentSegment]
              ) < DistanceToOpen
            ) {
              onCallbackCloseLocation();
            } else {
              onCallbackLocationFar();
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    startWatching();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isFollow, map]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    navigator.geolocation.getCurrentPosition((position) => {
      map.setCenter({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      });
      map.setZoom(18);
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      clickableIcons={false}
    >
      {path.map((aPath) => {
        return (
          <Polyline
            key={aPath[0].lat.toString()}
            path={aPath}
            // options={{
            //   strokeColor: index === currentSegment ? "#ff00ff" : "#000000",
            // }}
          />
        );
      })}
      {/* Child components, such as markers, info windows, etc. */}
      {images.map((image) => {
        return (
          <Marker
            key={`${image.lat}-${image.lng}`}
            position={{ lat: image.lat, lng: image.lng }}
          />
        );
      })}
      <Circle center={myLocation} radius={5} />
      <h2>Distans {distance}</h2>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default TrackMap;
