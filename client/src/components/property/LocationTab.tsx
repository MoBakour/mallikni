import { IProperty } from "../../types/types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.setIcon(DefaultIcon);

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
