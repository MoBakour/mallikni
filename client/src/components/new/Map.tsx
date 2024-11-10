import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

interface IMap {
    location: LatLng | null;
    setLocation: (location: LatLng | null) => void;
    picker?: boolean;
}

type TLocationPicker = {
    location: LatLng | null;
    setLocation: (location: LatLng | null) => void;
};

const Map = ({ location, setLocation, picker = true }: IMap) => {
    const LocationPicker = ({ location, setLocation }: TLocationPicker) => {
        useMapEvents({
            click(e) {
                if (!picker) return;
                setLocation(e.latlng);
            },
        });

        return location === null ? null : <Marker position={location}></Marker>;
    };

    return (
        <MapContainer
            center={location || new LatLng(25.2048, 55.2708)}
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
            <LocationPicker location={location} setLocation={setLocation} />
        </MapContainer>
    );
};

export default Map;
