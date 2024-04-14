// ** React Imports
import React from 'react';

// ** Custom Components Imports
import { Header, Listing, Navigation, Search, Footer } from '../components'

const Home = () => {

    return (
        <>
            <Header />
            <Navigation />
            <Search />
            <Listing />
            <Footer />
        </>
    )
}

export default Home