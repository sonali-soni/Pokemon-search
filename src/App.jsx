// ** React Imports
import React, { useEffect } from 'react';

// ** react-router-dom Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// ** Redux hooks Imports
import { useDispatch } from 'react-redux';

// ** Pages Imports
import { Bookmarks, Details, Home } from './pages'

// ** Imports from PokemonSlice
import { fetchPokemons, updateActiveRoute, fetchPokemonTypes } from './store/pokemon';
import { Header, Navigation, Search, Footer } from './components';

function App() {

  // ** react-redux hooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveRoute('/'))
    dispatch(fetchPokemons("https://pokeapi.co/api/v2/pokemon"));
    dispatch(fetchPokemonTypes());

    // ** Saving empty array if bookmarked key not available in localStorage
    if (!localStorage.getItem("bookmarked")) {
      localStorage.setItem("bookmarked", JSON.stringify([]));
    }
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Navigation />
        <Search />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/pokemon/:name' element={<Details />} />
          <Route exact path='/pokemon/bookmarks' element={<Bookmarks />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App