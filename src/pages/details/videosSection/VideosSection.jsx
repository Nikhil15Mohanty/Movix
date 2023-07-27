import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosSection = ({ data, loading }) => {
    // State to manage the visibility of the video popup and the videoId to display
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    // Function to render a skeleton UI for loading state
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            {/* Wrapping the content in a 'ContentWrapper' component */}
            <ContentWrapper>
                {/* Displaying the section heading */}
                <div className="sectionHeading">Official Videos</div>

                {/* Check if the data is loaded */}
                {!loading ? (
                    // If the data is available, render the list of videos
                    <div className="videos">
                        {/* Map through the video data */}
                        {data?.results?.map((video) => (
                            // Render a video item for each video
                            <div
                                key={video.id}
                                className="videoItem"
                                // When the video item is clicked, set the videoId and show the video popup
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                {/* Display the video thumbnail using the 'Img' component */}
                                <div className="videoThumbnail">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    {/* Display the play icon */}
                                    <PlayIcon />
                                </div>
                                {/* Display the video title */}
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // If data is loading, render the skeleton UI to indicate the loading state
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            {/* Render the VideoPopup component with props to manage its visibility and videoId */}
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
