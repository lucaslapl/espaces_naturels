import './App.css'
import Carte from './components/Carte';
import AjoutLieu from './components/AjoutLieu';

function App() {
  return (
    <div className="w-full mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">🌿 Carte des espaces naturels</h1>
      <AjoutLieu />
      <Carte />
    </div>
  );
}

export default App;