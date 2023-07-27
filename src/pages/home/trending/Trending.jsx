import React, { useState } from "react";

// Import the 'Carousel', 'ContentWrapper', and 'SwitchTabs' components
// from their respective paths
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

// Import the custom 'useFetch' hook to fetch data from the API
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
    // State variable 'endpoint' to track the current tab (default: 'day')
    const [endpoint, setEndpoint] = useState("day");

    // Use the custom 'useFetch' hook to fetch data for trending movies or TV shows
    // based on the 'endpoint' value (either 'day' or 'week')
    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

    // Function to handle tab change when clicking on 'Day' or 'Week'
    const onTabChange = (tab) => {
        // If 'Day' is selected, set 'endpoint' to 'day', else set it to 'week'
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            {/* Wrapper component for consistent styling */}
            <ContentWrapper>
                {/* Heading for the carousel section */}
                <span className="carouselTitle">Trending</span>

                {/* Component for switching between 'Day' and 'Week' tabs */}
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>

            {/* Render the 'Carousel' component with fetched data */}
            <Carousel
                data={data?.results} // Pass the fetched data as 'data' prop
                loading={loading} // Pass the loading state as 'loading' prop
            />
        </div>
    );
};

export default Trending;
