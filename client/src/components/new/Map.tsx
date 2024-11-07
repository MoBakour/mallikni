import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

interface IMap {
    position: LatLng | null;
    setPosition: (position: LatLng | null) => void;
    picker?: boolean;
}

type TLocationPicker = {
    position: LatLng | null;
    setPosition: (position: LatLng | null) => void;
};

const Map = ({ position, setPosition, picker = true }: IMap) => {
    const LocationPicker = ({ position, setPosition }: TLocationPicker) => {
        useMapEvents({
            click(e) {
                if (!picker) return;
                setPosition(e.latlng);
            },
        });

        return position === null ? null : <Marker position={position}></Marker>;
    };

    return (
        <MapContainer
            center={position || new LatLng(25.2048, 55.2708)}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            zoomControl={picker}
            dragging={picker}
            touchZoom={picker}
            scrollWheelZoom={picker}
            doubleClickZoom={picker}
            boxZoom={picker}
            keyboard={picker}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker position={position} setPosition={setPosition} />
        </MapContainer>
    );
};

export default Map;
