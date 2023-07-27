// Import necessary libraries and components
import React from "react";
import dayjs from "dayjs"; // Library for handling dates
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { useSelector } from "react-redux"; // Hook to access data from Redux store

import "./style.scss"; // Import the component's specific styles
import Img from "../lazyLoadImage/Img"; // Custom component for lazy-loading images
import CircleRating from "../circleRating/CircleRating"; // Custom component for displaying a circular rating
import Genres from "../genres/Genres"; // Custom component for displaying genre tags
import PosterFallback from "../../assets/no-poster.png"; // Default fallback poster image

// The MovieCard component takes data, fromSearch, and mediaType as props
const MovieCard = ({ data, fromSearch, mediaType }) => {
    // Access the 'url' property from the Redux store using the useSelector hook
    const { url } = useSelector((state) => state.home);

    // Access the navigate function using the useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // Determine the poster URL based on whether the data has a poster_path or use the fallback image
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    // Return JSX to render the MovieCard component
    return (
        <div
            className="movieCard"
            onClick={() =>
                // When the MovieCard is clicked, navigate to the detailed view of the movie/TV show
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            {/* Render the poster image */}
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    // Render the CircleRating and Genres components only if not from the search results
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>

            {/* Render the text block */}
            <div className="textBlock">
                {/* Display the title of the movie/TV show */}
                <span className="title">{data.title || data.name}</span>

                {/* Display the release date of the movie/TV show */}
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

// Export the MovieCard component as the default export
export default MovieCard;
