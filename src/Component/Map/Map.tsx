import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../Hooks/useGeoLocation";
import useUrlLocation from "../Hooks/useUrlLocation";
import Button from "../ComponentProps/Button";
import { IBookmark } from "../../Type/Type";
import { IHotel } from './../../Type/Type';

// Types


interface MapProps {
  markerLocations: (IBookmark | IHotel)[];
}

interface ChangeCenterProps {
  position: [number, number];
}

function Map({ markerLocations }: MapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 4]);
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className="map-container">
      <MapContainer
 
        className="map"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <Button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </Button>

        <DetectClick />
        <ChangeCenter position={mapCenter} />

        {markerLocations?.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

// ChangeCenter with useEffect to track prop changes
function ChangeCenter({ position }: ChangeCenterProps): null {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
}

// Handle map click
function DetectClick(): null {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
