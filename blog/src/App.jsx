import { useEffect, useState } from 'react'
import './App.css'
import TMDB from './TMDB'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  
  useEffect(() => {
    const loadAll = async () => {
        // Pegando a lista total
      
      let list = await TMDB.getHomeList();
      setMovieList(list);


      // Pegando o Destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await TMDB.getMovieInfo(chosen.id, 'tv');
      console.log(chosenInfo)
    }
    
    loadAll();
  }, []);


  return (
    <div className='page'>

      {featureData &&
        <FeaturedMovie item={featureData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={ item.title } items={ item.items } />
        ))}

      </section>
    </div>
  )
}

export default App
