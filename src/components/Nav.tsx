// src/components/Nav.tsx
import { useState } from 'react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton d'ouverture */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Menu
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu latéral */}
      <nav
        className={`fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white p-5 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="space-y-4">
          <li><a href="/" onClick={() => setIsOpen(false)}>Accueil</a></li>
          <li><a href="/about" onClick={() => setIsOpen(false)}>À propos</a></li>
          <li><a href="/contact" onClick={() => setIsOpen(false)}>Contact</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
