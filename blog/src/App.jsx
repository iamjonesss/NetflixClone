import { useEffect, useState } from 'react'
import './App.css'
import TMDB from './TMDB'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  
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

      setFeatureData(chosenInfo);
    }
    
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      }
      else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    }

  })


  return (
    <div className='page'>

      <Header black={ blackHeader} />
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
