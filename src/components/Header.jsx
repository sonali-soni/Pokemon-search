// ** React Imports
import React from 'react'

// ** Custom Styles Imports
import '../styles/header.css'

// ** react-router-dom Imports
import { Link } from 'react-router-dom'

// ** Redux hooks Imports
import { useDispatch } from 'react-redux';

// ** Imports from PokemonSlice
import { updateActiveRoute } from '../store/pokemon';

const Header = () => {

    // ** react-redux hooks
    const dispatch = useDispatch();

    return (
        <section className='header-main'>
            <div className="header">
                <Link to="/" onClick={() => dispatch(updateActiveRoute('/'))}>
                    <div className="header-left">
                        <div className="header-img">
                            <img src="/Pokemon.svg" alt="Pokemon" />
                        </div>
                    </div>
                </Link>

                <div className="header-right-icons">
                    <a target='_blank' href="https://www.linkedin.com/in/sonalisoni246/" aria-label="LinkedIn Profile">
                        <img src="/Linkedin.svg" alt="Linkedin" />
                    </a>
                    <a target='_blank' href=" https://github.com/sonali-soni" aria-label="Github Profile">
                        <img src="/Github.svg" alt="Github" />
                    </a>
                </div>

            </div>
            <div className="divider"></div>
        </section>
    )
}

export default Header
