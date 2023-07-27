import React, { useState } from "react";

// Import the 'Carousel', 'ContentWrapper', and 'SwitchTabs' components
// from their respective paths
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

// Import the custom 'useFetch' hook to fetch data from the API
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    // State variable 'endpoint' to track the current tab (default: 'movie')
    const [endpoint, setEndpoint] = useState("movie");

    // Use the custom 'useFetch' hook to fetch data for popular movies or TV shows
    // based on the 'endpoint' value
    const { data, loading } = useFetch(`/${endpoint}/popular`);

    // Function to handle tab change when clicking on 'Movies' or 'TV Shows'
    const onTabChange = (tab) => {
        // If 'Movies' is selected, set 'endpoint' to 'movie', else set it to 'tv'
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            {/* Wrapper component for consistent styling */}
            <ContentWrapper>
                {/* Heading for the carousel section */}
                <span className="carouselTitle">What's Popular</span>

                {/* Component for switching between 'Movies' and 'TV Shows' tabs */}
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>

            {/* Render the 'Carousel' component with fetched data */}
            <Carousel
                data={data?.results} // Pass the fetched data as 'data' prop
                loading={loading} // Pass the loading state as 'loading' prop
                endpoint={endpoint} // Pass the current 'endpoint' value as 'endpoint' prop
            />
        </div>
    );
};

export default Popular;
