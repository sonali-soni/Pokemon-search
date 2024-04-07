# Technologies Used
- ReactJS
- Redux Toolkit (for state management)
- Axios (for API calls)
- React Infinite Scroll Component (for infinite scrolling functionality)
- React Redux (for integrating Redux with React)
- React Router DOM (for routing within the app)
- React Tabs (for tab-based navigation)


# Getting Started
- Clone the repository to your local machine:
git clone 

- Navigate to the project directory:
cd pokedex-web-app

- Install the dependencies:
npm install

- Start the development server:
npm run dev

- Open the app in your browser: http://localhost:5173/


## API Integration
This app integrates with the [PokeAPI](https://pokeapi.co/) to fetch Pokémon data. The API base URL is https://pokeapi.co/api/v2. The following endpoints are used:

- **/pokemon :** Retrieves a list of all Pokémon. (by default 20 limit)

- **/pokemon/{name} :** Fetches detailed information about a specific Pokémon.
