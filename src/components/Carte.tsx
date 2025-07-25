import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
    <MapContainer center={[46.5, 2]} zoom={6} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
