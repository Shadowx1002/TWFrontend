import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom Green Marker for Stops
const customMarker = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #16a34a; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const TourMap = ({ startLocation, timeline }) => {
  // Default to Colombo, Sri Lanka if no coordinates are provided
  const defaultCenter = [6.9271, 79.8612]; 
  
  // Extract coordinates from backend data. 
  // Note: MongoDB stores as [Longitude, Latitude], Leaflet needs [Latitude, Longitude]
  const startCoords = startLocation?.coordinates?.length === 2 
    ? [startLocation.coordinates[1], startLocation.coordinates[0]] 
    : defaultCenter;

  // In a fully advanced app, you'd save coordinates for EVERY stop in the admin panel.
  // For now, we will plot the start location, and mock a few route points to show the line animation.
  const routePoints = [
    startCoords,
    [startCoords[0] + 0.1, startCoords[1] + 0.1], // Mock Point 2
    [startCoords[0] + 0.2, startCoords[1] - 0.05], // Mock Point 3
  ];

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white z-0 relative">
      <MapContainer 
        center={startCoords} 
        zoom={9} 
        scrollWheelZoom={false} 
        className="h-full w-full z-0"
      >
        {/* Beautiful Map Style from CartoDB (Free & No API Key) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Start Location Marker */}
        <Marker position={startCoords} icon={customMarker}>
          <Popup className="font-sans">
            <b className="text-[#111828] text-lg">Start Location</b><br />
            {startLocation?.description || "Tour Starting Point"}
          </Popup>
        </Marker>

        {/* Mocking other stops on the map to show the journey line */}
        {routePoints.map((pos, idx) => (
          idx !== 0 && (
            <Marker key={idx} position={pos} icon={customMarker}>
              <Popup>
                <b>Journey Stop {idx}</b><br/>Exploring Sri Lanka
              </Popup>
            </Marker>
          )
        ))}

        {/* Animated Polyline connecting the dots */}
        <Polyline 
          positions={routePoints} 
          pathOptions={{ color: '#16a34a', weight: 4, dashArray: '10, 10', className: 'animate-pulse' }} 
        />
      </MapContainer>
    </div>
  );
};

export default TourMap;