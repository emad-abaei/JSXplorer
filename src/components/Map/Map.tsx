import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent
} from "react-leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { useScreen } from "../../contexts/ScreenContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Flag from "../Flag";
import { PositionType } from "../../types";
import styles from "./Map.module.css";
import { useSidebar } from "../../contexts/SidebarContext";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<PositionType>([51.505, -0.09]);
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng && !isNaN(mapLat) && !isNaN(mapLng))
      setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            {city.notes && (
              <Popup>
                <Flag
                  country={city.country}
                  countryIsoCode={city.countryIsoCode}
                />
                <span>{city.notes}</span>
              </Popup>
            )}
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick setMapPosition={setMapPosition} />
      </MapContainer>
    </div>
  );
}

interface ChangeCenterProps {
  position: PositionType;
}

function ChangeCenter({ position }: ChangeCenterProps): null {
  const map = useMap();
  const { isSmallScreen } = useScreen();

  useEffect(() => {
    if (position) {
      if (isSmallScreen) {
        // Offset calculation for small screens
        const containerPoint = map.latLngToContainerPoint(position);
        const offsetPoint = containerPoint.subtract([map.getSize().x * 0.3, 0]); // 30% offset from the right
        const newLatLng = map.containerPointToLatLng(offsetPoint);

        map.setView(newLatLng);
      } else {
        // Default behavior for larger screens
        map.setView(position);
      }
    }
  }, [map, position, isSmallScreen]);

  return null;
}

interface DetectClickProps {
  setMapPosition: Dispatch<SetStateAction<PositionType>>;
}

function DetectClick({ setMapPosition }: DetectClickProps) {
  const navigate = useNavigate();
  const { openSidebar } = useSidebar();

  useMapEvent("click", (e) => {
    setMapPosition([e.latlng.lat, e.latlng.lng]);
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    openSidebar();
  });

  return null;
}

export default Map;
