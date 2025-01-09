import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';

import kendric_lamar_songs from '../src/assets/data/kendric_lamar_tracks_clustered.json'
import SearchBar from "./components/SearchBar";
import SongDetailsModal from "./components/SongDetailsModal";

const tailwindColors = [
  "bg-slate-",
  "bg-gray-",
  "bg-zinc-",
  "bg-neutral-",
  "bg-stone-",
  "bg-red-",
  "bg-orange-",
  "bg-amber-",
  "bg-yellow-",
  "bg-lime-",
  "bg-green-",
  "bg-emerald-",
  "bg-teal-",
  "bg-cyan-",
  "bg-sky-",
  "bg-blue-",
  "bg-indigo-",
  "bg-violet-",
  "bg-purple-",
  "bg-fuchsia-",
  "bg-pink-",
  "bg-rose-"
];

function App() {
  const shuffled_data = shuffleArray(kendric_lamar_songs)

  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setdata] = useState(shuffled_data.slice(30,40))
  const [similarSongs, setsimilarSongs] = useState([])
  const [show_song_datails, setShow_song_datails] = useState(false);
  const [selectedSong, setselectedSong] = useState(undefined)

  const openModal = () => setShow_song_datails(true);
  const closeModal = () => setShow_song_datails(false);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 3,
    speed: 500,
    dots: true
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      // Generar un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));
      
      // Intercambiar los elementos en las posiciones i y j
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }




  let colors = []

  const showSimilarSongs = () => {
    const filtered = kendric_lamar_songs.filter(
      item => item.Cluster == data[currentIndex].Cluster
      && item.track_name !== data[currentIndex].track_name
    )
    console.log("similar: ",filtered );
    
    setsimilarSongs(shuffleArray(filtered).slice(0,3))
  }

  data.forEach(s => colors.push(tailwindColors[Math.floor(Math.random() * tailwindColors.length)]+'700'))

  useEffect(() => {
    showSimilarSongs()
  }, [currentIndex])
  

  const onSelectSong = (song) => {
    
    // Crear una copia del array de data
    const newData = [...data];
    
    // Reemplazar el valor en la posición del índice actual
    newData[currentIndex] = song;
    
    // Actualizar el estado con la nueva copia
    setdata(newData);
    showSimilarSongs()
  };

  const handleMostrarDetalles = (song) => {
    setselectedSong(song)
    openModal()
  }
  

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col justify-around items-center ">
      <div className="text-center my-2">
        <h1
          className="text-blue-500 text-4xl font-bold"
          style={{ textShadow: "10px 10px 10px rgba(0, 0, 255, 0.7)" }}
        >
          LamarLink
        </h1>
        <h2 className="text-blue-400 text-2xl font-mono">
          Conecta canciones relacionadas con Kendrick Lamar.
        </h2>
      </div>

      <SearchBar onSelectSong={onSelectSong} />

      <div className="slider-container mx-auto w-full max-w-5xl  ">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {
          data.map((s, index) => (
            <SwiperSlide key={index}
            onClick={() => handleMostrarDetalles(s)}
            >
              <div  className={`w-full h-full text-white font-bold p-3 ${colors[index]}`} >
                <img className="w-full bg-slate-900 h-56 "  src={s.album_artwork_url}>

                </img>
                <div className="flex flex-col font-mono mt-1 " >
                  <p className="text-md" >{s.track_name}</p>
                  <p className="text-xs">{s.album_name}</p>
                </div>
                

              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      
      </div >
      
      <div className="w-2/3 text-center group">
        <h2 className="text-blue-500 font-mono text-lg font-bold mb-2 ">
          Canciones que te podrían gustar...
        </h2>
        <div className="flex flex-row justify-around">
          {
            similarSongs.map((s, index) => (
              <div 
                key={index}
                className="card hover:scale-105 ease-in duration-300" 
                onClick={() => handleMostrarDetalles(s)}
              >
                <div className={`w-full h-full text-white font-bold p-3 ${colors[index]}`} >
                  <img className="w-full bg-slate-900 h-56 "  src={s.album_artwork_url} alt={s.track_name} />
                  <div className="flex flex-col font-mono mt-1">
                    <p className="text-[10px] truncate">{s.track_name}</p>
                    <p className="text-[8px] truncate">{s.album_name}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>


      {show_song_datails && <SongDetailsModal song={selectedSong} onClose={closeModal} />}
      
    </div>
  );
}

export default App;
