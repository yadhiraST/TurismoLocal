import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX para iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// 👇 COMPONENTE CLAVE PARA MÓVIL
function MapResizeHandler() {
  const map = useMap();
  
  useEffect(() => {
    // Espera a que el DOM termine de renderizar
    const timer = setTimeout(() => {
      map.invalidateSize(); // Esto arregla el problema en móvil [citation:3]
    }, 200);
    
    // También cuando cambia orientación
    window.addEventListener('resize', () => map.invalidateSize());
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', () => map.invalidateSize());
    };
  }, [map]);
  
  return null;
}

// Tu código normal...
export default function MapScreen({ onSelectDestination }: MapScreenProps) {
  // ... resto de tu estado y lógica

  return (
    <div className="h-full flex flex-col">
      {/* Header de búsqueda... */}
      
      {/* 👇 CONTENEDOR CON ALTURA EXPLÍCITA */}
      <div style={{ height: '70vh', width: '100%' }}> 
        <MapContainer
          center={[-13.5319, -71.9675]}
          zoom={12}
          style={{ width: '100%', height: '100%' }}  // ← Altura 100% funciona porque el padre tiene altura fija
          scrollWheelZoom={true}
        >
          <MapResizeHandler />  {/* ← CRÍTICO para móvil */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          {/* Tus markers... */}
        </MapContainer>
      </div>
    </div>
  );
}