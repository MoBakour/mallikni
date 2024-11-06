import { IProperty } from "../../types/types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ILocationTab {
    property: IProperty;
}

const LocationTab = ({ property }: ILocationTab) => {
    const position: [number, number] = [property.latitude, property.longitude];

    return (
        <section>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}></Marker>
            </MapContainer>
        </section>
    );
};

export default LocationTab;
