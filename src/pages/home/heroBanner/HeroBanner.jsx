import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

// Import the custom hook 'useFetch' to fetch data from the API
import useFetch from "../../../hooks/useFetch";

// Import the 'Img' component responsible for lazy-loading images
import Img from "../../../components/lazyLoadImage/Img";

// Import the 'ContentWrapper' component used for structuring the content layout
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    // State variables to store background image URL and search query
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    // Get the 'navigate' function from 'react-router-dom' for programmatic navigation
    const navigate = useNavigate();

    // Access the 'url' state from the 'home' slice in the Redux store using 'useSelector' hook
    const { url } = useSelector((state) => state.home);

    // Use the custom 'useFetch' hook to fetch data for upcoming movies from the API
    const { data, loading } = useFetch("/movie/upcoming");

    // useEffect hook to update the background image URL when 'data' changes
    useEffect(() => {
        // Generate a random number to select a backdrop image from the fetched data
        const randomIndex = Math.floor(Math.random() * 20);

        // Construct the background image URL using the API configuration 'url' and fetched data
        const bg = url.backdrop + data?.results?.[randomIndex]?.backdrop_path;

        // Update the 'background' state with the constructed image URL
        setBackground(bg);
    }, [data]);

    // Function to handle search query and navigate to search results page
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            // Navigate to the search results page with the search query as a parameter
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {/* Conditionally render the backdrop image once data is loaded */}
            {!loading && (
                <div className="backdrop-img">
                    {/* Render the 'Img' component with the background image URL */}
                    <Img src={background} />
                </div>
            )}

            {/* Apply an overlay effect on top of the background image */}
            <div className="opacity-layer"></div>

            {/* Render the content inside the 'ContentWrapper' component */}
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    {/* Input field and search button for search functionality */}
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
