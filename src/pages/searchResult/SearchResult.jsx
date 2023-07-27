// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook to access URL parameters
import InfiniteScroll from "react-infinite-scroll-component"; // Library for infinite scrolling

import "./style.scss"; // Import the component's specific styles

import { fetchDataFromApi } from "../../utils/api"; // Custom function to fetch data from the API
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"; // Custom component for wrapping content
import MovieCard from "../../components/movieCard/MovieCard"; // Custom component for rendering movie cards
import Spinner from "../../components/spinner/Spinner"; // Custom component for rendering loading spinner
import noResults from "../../assets/no-results.png"; // Default image for no results found

// The SearchResult component is responsible for displaying search results
const SearchResult = () => {
    // Declare state variables using the useState hook
    const [data, setData] = useState(null); // Holds the search results data
    const [pageNum, setPageNum] = useState(1); // Tracks the current page number
    const [loading, setLoading] = useState(false); // Indicates if data is currently being fetched
    const { query } = useParams(); // Access the 'query' parameter from the URL

    // Function to fetch initial data based on the search query
    const fetchInitialData = () => {
        setLoading(true); // Set loading to true to display the spinner
        // Call the fetchDataFromApi function to fetch search results from the API
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res); // Set the fetched data in the state
                setPageNum((prev) => prev + 1); // Increment the page number for the next request
                setLoading(false); // Set loading to false to hide the spinner
            }
        );
    };

    // Function to fetch more data when scrolling down (infinite scroll)
    const fetchNextPageData = () => {
        // Call the fetchDataFromApi function to fetch the next page of search results
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    // If there are existing results, append the new results to the existing ones
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    // If no existing results, set the fetched data as the new data
                    setData(res);
                }
                setPageNum((prev) => prev + 1); // Increment the page number for the next request
            }
        );
    };

    // useEffect hook to run the fetchInitialData function when the query parameter changes
    useEffect(() => {
        setPageNum(1); // Reset the page number to 1 when the query changes
        fetchInitialData(); // Fetch initial data based on the new query
    }, [query]);

    // Return JSX to render the SearchResult component
    return (
        <div className="searchResultsPage">
            {/* Display the loading spinner while data is being fetched */}
            {loading && <Spinner initial={true} />}
            {!loading && (
                // Render the content when data is not loading
                <ContentWrapper>
                    {/* Check if there are search results */}
                    {data?.results?.length > 0 ? (
                        <>
                            {/* Display the page title with the search query */}
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            {/* Render the search results using InfiniteScroll component */}
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData} // Function to fetch more data on scrolling down
                                hasMore={pageNum <= data?.total_pages} // Indicates if there are more pages to load
                                loader={<Spinner />} // Loading spinner to display when more data is being fetched
                            >
                                {/* Map through the search results and render MovieCard for each item */}
                                {data?.results.map((item, index) => {
                                    // Skip rendering if the media_type is 'person'
                                    if (item.media_type === "person") return null;
                                    return (
                                        // Render the MovieCard component for each search result
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true} // Indicates that the MovieCard is from search results
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        // Display a message if no search results are found
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

// Export the SearchResult component as the default export
export default SearchResult;
