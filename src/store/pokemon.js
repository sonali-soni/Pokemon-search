// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch pokemons url
export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async ({ typeUrl, page = 1 }, { getState }) => {
    const limit = 50;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`;
    if (typeUrl && typeUrl !== 'all') {
        url = `https://pokeapi.co/api/v2/type/${typeUrl}`;
    }

    const response = await axios.get(url);
    let pokemons = response.data.results || []; // Default to an empty array if no results

    // If fetching by type, adjust the structure to match the general fetch format
    if (typeUrl && typeUrl !== 'all') {
        pokemons = response.data.pokemon.map(p => p.pokemon);
    }

    // Fetch details for each Pokémon if necessary
    const detailedPokemons = await Promise.all(pokemons.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);
        return pokemonResponse.data;
    }));

    return {
        pokemons: detailedPokemons,
        nextPage: response.data.next ? page + 1 : null
    };
});

// ** Fetch pokemons data
export const fetchSinglePokemon = createAsyncThunk('pokemon/fetchSinglePokemon', async (results, { dispatch }) => {

    dispatch(updateLoading(true))

    const pokemonPromises = results.map(async (element) => {
        const response = await axios.get(element.url);

        return response.data;
    });

    const allPokemon = await Promise.all(pokemonPromises);
    allPokemon.sort((a, b) => a.id > b.id ? 1 : -1);

    dispatch(updateLoading(false))

    return allPokemon
})

// ** Fetch Single pokemon data using name
export const fetchSinglePokemonDetail = createAsyncThunk('pokemon/fetchSinglePokemonDetail', async (name, { dispatch }) => {

    dispatch(updateLoading(true))

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        dispatch(updateLoading(false))

        return response.data
    } catch (error) {
        dispatch(updateLoading(false))

        return []
    }
})

// ** Fetch Pokemon Types
export const fetchPokemonTypes = createAsyncThunk('pokemon/fetchPokemonTypes', async (_, { dispatch }) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/`);
    const filteredTypes = response.data.results.filter(type => type.name !== 'unknown' && type.name !== 'shadow');
    return filteredTypes;
})

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemonList: [],
        pokemonData: [],
        pokemon: [],
        nextPage: 1,
        activeRoute: '/',
        loading: false,
        pokemonTypes: [],
        selectedType: 'all'
    },
    reducers: {
        updateActiveRoute: (state, action) => {
            state.activeRoute = action.payload;
        },
        updateNextPage: (state, action) => {
            state.nextPage = action.payload;
        },
        updateLoading: (state, action) => {
            state.loading = action.payload;
        },
        removePokemon: state => {
            state.pokemon = []
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            // Check if we are appending pokemons or replacing the list
            if (action.meta.arg.page === 1) {
                // If it's the first page, replace the list
                state.pokemonData = action.payload.pokemons;
            } else {
                // If it's not the first page, append the pokemons
                state.pokemonData = [...state.pokemonData, ...action.payload.pokemons];
            }
            state.nextPage = action.payload.nextPage;
            state.loading = false;
        })
        .addCase(fetchPokemons.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemons.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(fetchSinglePokemon.fulfilled, (state, action) => {
            state.pokemonData = [...state.pokemonData, ...action.payload]
        })
        builder.addCase(fetchSinglePokemonDetail.fulfilled, (state, action) => {
            state.pokemon = action.payload;
        })
        builder.addCase(fetchPokemonTypes.fulfilled, (state, action) => {
            state.pokemonTypes = action.payload;
        })
    }
})

export const { updateActiveRoute, updateNextPage, updateLoading, removePokemon, setSelectedType } = pokemonSlice.actions

export default pokemonSlice.reducer
