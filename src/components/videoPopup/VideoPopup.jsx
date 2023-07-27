import React from "react";
import ReactPlayer from "react-player/youtube";

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    // Function to hide the video popup and reset the video ID
    const hidePopup = () => {
        setShow(false); // Set 'show' state to false to hide the popup
        setVideoId(null); // Reset the 'videoId' state to null
    };

    return (
        // The video popup container with dynamic visibility class
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            {/* Opacity layer to create a semi-transparent background */}
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                {/* Close button to hide the video popup */}
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                {/* ReactPlayer component to display the YouTube video */}
                <ReactPlayer
                    // Set the URL of the YouTube video using the videoId prop
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls // Display video player controls (play, pause, etc.)
                    width="100%" // Set the width of the video player to 100% of the container
                    height="100%" // Set the height of the video player to 100% of the container
                    playing={true} // Uncomment this line to auto-play the video when the popup opens
                />
            </div>
        </div>
    );
};

export default VideoPopup;
