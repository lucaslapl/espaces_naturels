import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

type Lieu = {
  id: string;
  nom: string;
  description: string;
  latitude: number;
  longitude: number;
};

export default function Carte() {
  const [lieux, setLieux] = useState<Lieu[]>([]);

  useEffect(() => {
    const fetchLieux = async () => {
      const { data, error } = await supabase.from('lieux').select('*');
      if (error) console.error(error);
      else setLieux(data);
    };
    fetchLieux();
  }, []);

  return (
    <MapContainer center={[46.5, 2]} zoom={6} zoomControl={false} className="h-screen w-full fixed top-0 left-0">
      <ZoomControl position="topright" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='Source: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite (ESRI)">
          <TileLayer attribution='Tiles © Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
      </LayersControl>
      {lieux.map((lieu) => (
        <Marker key={lieu.id} position={[lieu.latitude, lieu.longitude]}>
          <Popup>
            <strong>{lieu.nom}</strong><br />
            {lieu.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
