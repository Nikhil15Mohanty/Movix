import React from "react";

// Importing useSelector from react-redux to access the genres data from the Redux store
import { useSelector } from "react-redux";

// Importing the custom style for the Genres component
import "./style.scss";

const Genres = ({ data }) => {
    // Accessing the "genres" state from the Redux store using useSelector
    const { genres } = useSelector((state) => state.home);

    return (
        <div className="genres">
            {/* Mapping over the "data" prop (an array of genre IDs) and rendering the corresponding genre names */}
            {data?.map((g) => {
                // If the genre ID is not present in the genres data, or if the genre name is not available, skip rendering
                if (!genres[g]?.name) return;

                // Render each genre with a unique key (using the genre ID) and the corresponding genre name
                return (
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
