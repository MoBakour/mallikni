import { IProperty } from "../../types/types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ILocationTab {
    property: IProperty;
}

const LocationTab = ({ property }: ILocationTab) => {
    const location: [number, number] = [
        property.location[0],
        property.location[1],
    ];

    return (
        <section>
            <MapContainer
                center={location}
                zoom={13}
                style={{ height: "400px", width: "100%", zIndex: 0 }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location}></Marker>
            </MapContainer>
        </section>
    );
};

export default LocationTab;
