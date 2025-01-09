import React, { useEffect, useRef } from 'react';

const SongDetailsModal = ({ song, onClose }) => {
  const modalRef = useRef(null); // Referencia al contenedor del modal
  
  const handleClickOutside = (event) => {
    // Verifica si el clic fue fuera del modal, pero dentro del fondo
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // onClose(); // Llama a onClose si se hace clic fuera del modal
    }
  };

  // Usamos useEffect para añadir y limpiar el eventListener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);  // Detectar clic fuera
    return () => {
      document.removeEventListener('click', handleClickOutside);  // Limpiar eventListener
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50"
      ref={modalRef} // La referencia se aplica aquí

    >
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg relative  overflow-y-auto"
      
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        
        {/* Contenido del modal */}
        <div className="text-center flex justify-center items-center flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{song.track_name}</h2>
          <p className="text-md text-gray-600">{song.album_name}</p>
          <p className="text-md text-gray-600 mb-2">{song.artist_name}</p>
          
          <div className="flex flex-row mb-4">
            <img
              className="w-52 h-52 rounded-lg"
              src={song.album_artwork_url}
              alt={song.track_name}
            />
           
          </div>

          <div className='flex flex-row w-full justify-around items-center' >
            <div className="text-left text-sm text-gray-500">
            <p className="text-sm text-gray-500">{`Año de salida: ${song.release_date}`}</p>
              <p className="text-sm text-gray-500">{`Año: ${song.release_year}`}</p>
              <p className="text-sm text-gray-500">{`Duración: ${Math.floor(song.duration_ms / 60000)} min`}</p>
              <p className="text-sm text-gray-500">{`Popularidad: ${song.popularity}`}</p>
              <p className="text-sm text-gray-500">{`Explicito: ${song.explicit === "True" ? "Sí" : "No"}`}</p>
            </div>

            {/* Detalles de la canción */}
            <div className="text-left text-sm text-gray-500">
              <p><strong>Danceability:</strong> {song.danceability}</p>
              <p><strong>Energy:</strong> {song.energy}</p>
              <p><strong>Valence:</strong> {song.valence}</p>
              <p><strong>Tempo:</strong> {song.tempo} BPM</p>
              <p><strong>Loudness:</strong> {song.loudness} dB</p>
              <p><strong>Speechiness:</strong> {song.speechiness}</p>
              <p><strong>Acousticness:</strong> {song.acousticness}</p>
              <p><strong>Instrumentalness:</strong> {song.instrumentalness}</p>
              <p><strong>Liveness:</strong> {song.liveness}</p>
            </div>

          </div>


          {/* Información adicional sobre si la canción es parte de un álbum o es una colaboración */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">¿Es parte de un álbum? {song.is_album_track === "True" ? "Sí" : "No"}</p>
            <p className="text-sm text-gray-500">¿Es una colaboración? {song.is_feature === "True" ? "Sí" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetailsModal;
