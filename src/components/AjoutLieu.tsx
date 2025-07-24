import { useState } from 'react';
import supabase from '../lib/supabase';

export default function AjoutLieu() {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('lieux').insert({
      nom,
      description,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    });
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Lieu ajouté !");
      setNom('');
      setDescription('');
      setLat('');
      setLon('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du lieu" className="w-full p-2 border rounded" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
      <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" className="w-full p-2 border rounded" />
      <input value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" className="w-full p-2 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      {message && <p>{message}</p>}
    </form>
  );
}
