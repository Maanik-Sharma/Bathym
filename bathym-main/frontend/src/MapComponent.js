import React, { useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
    
  });

function MapComponent() {
    const [position, setPosition] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMapClick = async (event) => {
        const { lat, lng } = event.latlng;
        setPosition([lat, lng]);
        setLoading(true);
        setError('');
        setData(null);

        try {
            const response = await fetch(`http://127.0.0.1:5000/data?lat=${lat}&lon=${lng}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            if (result.error) {
                throw new Error(result.message);
            }
            setData(result);
        } catch (error) {
            setError(error.message || "Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    const MapEvents = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    const bounds = [[2.3978, 61.4624], [35.7265, 97.1889]]; // [SouthWest, NorthEast] coordinates
    const imageUrl = '/map.png'; // Path to your map image
    const center = [19.0760, 72.8777]; // Latitude, Longitude of Mumbai (example)

    return (
        <div>
            {/* <h1 style={{ textAlign: 'center' }}>India Region Map</h1> */}
            <MapContainer 
                center={center} 
                zoom={7}  // Adjust zoom level as needed
                style={{ height: "600px", width: "100%" }}
            >
                <ImageOverlay url={imageUrl} bounds={bounds} />
                <MapEvents />
                {position && (
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            {loading && <p>Loading data...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {data && (
                                <div>
                                    <h3>Elevation Data:</h3>
                                    <p>Latitude: {data.latitude}</p>
                                    <p>Longitude: {data.longitude}</p>
                                    <p>Elevation: {data.elevation} meters</p>
                                </div>
                            )}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

export default MapComponent;


// import React, { useState } from 'react';
// import { MapContainer, TileLayer, useMapEvents, Popup, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import PouchDB from 'pouchdb';
// import 'leaflet.offline';
// import { Icon } from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// const customIcon = new Icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
    
//   });

// function MapComponent() {
//     const [position, setPosition] = useState(null);
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleMapClick = async (event) => {
//         const { lat, lng } = event.latlng;
//         setPosition([lat, lng]);
//         setLoading(true);
//         setError('');
//         setData(null);

//         try {
//             const response = await fetch(`http://127.0.0.1:5000/data?lat=${lat}&lon=${lng}`);
//             if (!response.ok) {
//                 throw new Error("Failed to fetch data");
//             }
//             const result = await response.json();
//             if (result.error) {
//                 throw new Error(result.message);
//             }
//             setData(result);
//         } catch (error) {
//             setError(error.message || "Error fetching data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const MapEvents = () => {
//         useMapEvents({
//             click: handleMapClick
//         });
//         return null;
//     };

//     return (
//         <div>
//             <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "600px", width: "100%" }}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution="&copy; OpenStreetMap contributors"
//                     useCache={true}
//                     crossOrigin={true}
//                     saveToCache={true}
//                     cacheMaxAge={24*3600*1000}  // Cache tiles for 24 hours
//                 />
//                 <MapEvents />
//                 {position && (
//                     <Marker position={position} icon={customIcon}>
//                         <Popup>
//                             {loading && <p>Loading data...</p>}
//                             {error && <p style={{ color: 'red' }}>{error}</p>}
//                             {data && (
//                                 <div>
//                                     <h3>Elevation Data:</h3>
//                                     <p>Latitude: {data.latitude}</p>
//                                     <p>Longitude: {data.longitude}</p>
//                                     <p>Elevation: {data.elevation} meters</p>
//                                 </div>
//                             )}
//                         </Popup>
//                     </Marker>
//                 )}
//             </MapContainer>
//         </div>
//     );
// }

// export default MapComponent;
