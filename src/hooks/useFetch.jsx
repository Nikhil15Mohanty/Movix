import { useEffect, useState } from "react";

// Import the custom 'fetchDataFromApi' function to fetch data from the API
import { fetchDataFromApi } from "../utils/api";

// Custom hook 'useFetch' to fetch data from the API and handle loading and errors
const useFetch = (url) => {
    // State variables to hold fetched data, loading status, and error message
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    // useEffect hook is used to trigger the data fetching process when 'url' changes
    useEffect(() => {
        // Before starting the data fetch, set loading state to 'loading...'
        setLoading("loading...");

        // Reset previous data and error states
        setData(null);
        setError(null);

        // Fetch data from the API using the 'fetchDataFromApi' function
        fetchDataFromApi(url)
            .then((res) => {
                // If data is fetched successfully, set loading state to false
                // and store the fetched data in the 'data' state variable
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                // If an error occurs during data fetch, set loading state to false
                // and store the error message in the 'error' state variable
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]); // The useEffect hook will re-run when the 'url' changes

    // Return the fetched data, loading status, and error message as an object
    return { data, loading, error };
};

export default useFetch;
