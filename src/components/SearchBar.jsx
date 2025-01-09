import React, { useState, useRef, useEffect } from 'react';
import data from '../assets/data/kendric_lamar_tracks_clustered.json';

const SearchBar = ({onSelectSong}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [showResults, setShowResults] = useState(true);  // Empezamos con los resultados ocultos
  const resultsRef = useRef(null);  // Referencia al contenedor de resultados

  // Función que maneja el cambio en el campo de búsqueda
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    
    if (query === '' || query === " ") {
      // Si la búsqueda está vacía, no mostrar resultados
      setFilteredData([]);
    } else {
      // Filtrar la data en base al término de búsqueda
      
      const filtered = data.filter(item => 
        item.track_name.toLowerCase().includes(query.toLowerCase()) || 
        item.album_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Función para detectar clics fuera del contenedor de resultados
  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      setShowResults(false);  // Ocultar los resultados si se hace clic fuera
    }
  };

  // Usamos useEffect para añadir y limpiar el eventListener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);  // Detectar clic fuera
    return () => {
      document.removeEventListener('click', handleClickOutside);  // Limpiar el eventListener cuando el componente se desmonta
    };
  }, []);

  const onClick = (song) => {
    setShowResults(false)
    onSelectSong(song)
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4 relative"
    ref={resultsRef}
    >
      <input
        onClick={() => setShowResults(true)}  // Mostrar resultados al hacer clic en el input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Escriba el nombre de una canción..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Solo mostrar resultados si hay algo en filteredData y showResults es true */}
      {filteredData.length > 0 && showResults && (
        <ul
           // Asociamos la referencia al contenedor de resultados
          className="absolute w-full mt-1 bg-white shadow-lg z-10 max-h-64 overflow-y-auto"
        >
          {filteredData.map(item => (
            <li key={item.id} className="p-1 border-b border-gray-200 flex flex-row cursor-pointer hover:bg-gray-200"
              onClick={() => onClick(item)}
            >
              <img className="w-12 bg-slate-900 h-12 mr-2" src={item.album_artwork_url} alt={item.album_name} />
              {`${item.track_name} - ${item.album_name}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
