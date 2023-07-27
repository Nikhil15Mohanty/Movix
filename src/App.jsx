// Import the necessary hooks from 'react' library
import { useState, useEffect } from "react";

// Import the components and hooks from 'react-router-dom' library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import the custom utility function fetchDataFromApi from './utils/api'
import { fetchDataFromApi } from "./utils/api";

// Import Redux hooks from 'react-redux' for state management
import { useSelector, useDispatch } from "react-redux";

// Import the action creators from './store/homeSlice' for dispatching actions
import { getApiConfiguration, getGenres } from "./store/homeSlice";

// Import the Header, Footer, and other page components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
    // Get the 'dispatch' function from Redux to dispatch actions
    const dispatch = useDispatch();

    // Access the 'url' state from the 'home' slice in the Redux store using 'useSelector' hook
    const { url } = useSelector((state) => state.home);
    console.log(url);

    // Use 'useEffect' hook to fetch API configuration and genre data when the component mounts
    useEffect(() => {
        // Call 'fetchApiConfig' function to fetch API configuration data
        fetchApiConfig();

        // Call 'genresCall' function to fetch genre data
        genresCall();
    }, []);

    // Function to fetch API configuration data
    const fetchApiConfig = () => {
        // Call 'fetchDataFromApi' function with the endpoint '/configuration'
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);

            // Extract necessary data from the response and create a 'url' object
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            // Dispatch the 'getApiConfiguration' action with the 'url' object as payload
            dispatch(getApiConfiguration(url));
        });
    };

    // Function to fetch genre data for both 'tv' and 'movie' endpoints
    const genresCall = async () => {
        // Create an array to store all the API requests
        let promises = [];
        // Define the endpoints for genres for both 'tv' and 'movie'
        let endPoints = ["tv", "movie"];
        // Create an empty object to store all the genre data
        let allGenres = {};

        // Loop through each endpoint to make API requests and store the promises
        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        // Wait for all the promises to resolve using Promise.all()
        const data = await Promise.all(promises);
        console.log(data);
        // Iterate through the data and extract genre information into 'allGenres' object
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        // Dispatch the 'getGenres' action with 'allGenres' object as payload
        dispatch(getGenres(allGenres));
    };

    return (
        // Set up the 'BrowserRouter' for handling routing
        <BrowserRouter>
            {/* Render the Header component */}
            <Header />
            {/* Define the routes and their corresponding components */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* Render the Footer component */}
            <Footer />
        </BrowserRouter>
    );
}

export default App;
