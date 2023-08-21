import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { TriviaTrekProps } from "../models/interfaces/TriviaTrekProps";
import { Question } from "../models/interfaces/Questions";

import QuestionModal from "./Modals/QuestionModal";
import { useActiveRoute } from "../stores/TrackStore";

const mapStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default function Map({
  // userId,
  // userName,
  track,
  questions,
}: TriviaTrekProps) {
  const ref = useRef(null);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates>();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pathLine, setPathLine] = useState<google.maps.Polyline | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Question | undefined>(
    undefined
  );

  useEffect(() => {
    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation(position.coords);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  function handleCloseModal() {
    setSelectedMarker(undefined);
  }

  const { answeredQuestions } = useActiveRoute();
  const [initQuestions] = useState(answeredQuestions);
  useEffect(() => {
    if (answeredQuestions.length > initQuestions.length) {
      setSelectedMarker(undefined);
    }
  }, [answeredQuestions]);
  const handleMarkerClick = (
    markerData: SetStateAction<Question | undefined>
  ) => {
    setSelectedMarker(markerData);
  };

  async function renderUser(map: google.maps.Map) {
    const userMarker = new google.maps.Marker({
      position: map.getCenter(),
      icon: {
        url: "/icons/user.svg",
        scaledSize: new google.maps.Size(30, 30),
      },
      map: map,
    });

    userMarker.setMap(map);
  }

  function renderPath(map: google.maps.Map) {
    const pathCoordinates = track?.coordinates.map((coord) => {
      return { lat: coord.latitude, lng: coord.longitude };
    });
    const pathLineTemp = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    pathLineTemp.setMap(map);
    setPathLine(pathLineTemp);
  }
  function renderQuestions(map: google.maps.Map) {
    questions?.map((question) => {
      const questionMarker = new google.maps.Marker({
        position: {
          lat: question.coordinate.latitude,
          lng: question.coordinate.longitude,
        },
        icon: {
          url: "/icons/question.svg",
          scaledSize: new google.maps.Size(30, 30),
        },
        map: map,
        animation: google.maps.Animation.DROP,
      });

      questionMarker.setMap(map);
      questionMarker.addListener("click", () => {
        handleMarkerClick(question);
      });
    });
  }

  useEffect(() => {
    if (userLocation && ref.current && !map) {
      const mymap = new google.maps.Map(ref.current, {
        center: {
          lat: userLocation?.latitude ?? 0,
          lng: userLocation?.longitude ?? 0,
        },
        zoom: 15,
        styles: mapStyles,
      });

      renderUser(mymap);
      setMap(mymap);
    }
  }, [userLocation]);

  useEffect(() => {
    if (map && track) {
      if (pathLine != null) {
        pathLine.setMap(null);
      }

      renderPath(map);
      if (questions) {
        renderQuestions(map);
      }
    }
  }, [map, track]);

  return (
    <>
      <div
        ref={ref}
        style={{ height: "500px", width: "100%", border: "1px solid black" }}
      />
      <QuestionModal
        handleCloseModal={handleCloseModal}
        question={selectedMarker}
      />
    </>
  );
}
