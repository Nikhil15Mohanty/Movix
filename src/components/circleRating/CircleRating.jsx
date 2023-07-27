import React from "react";

// Importing components and styles from the "react-circular-progressbar" library
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Importing the custom style for the CircleRating component
import "./style.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            {/* Render the circular progress bar with the provided rating */}
            <CircularProgressbar
                value={rating} // Set the current value of the progress bar to the rating
                maxValue={10} // Set the maximum value of the progress bar to 10 (since ratings range from 0 to 10)
                text={rating} // Display the rating value as text inside the circular progress bar
                styles={buildStyles({
                    // Define the custom styles for the circular progress bar
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green", // Set the color of the progress bar based on the rating value
                })}
            />
        </div>
    );
};

export default CircleRating;
