import React, { useRef } from "react";

// Importing icons from react-icons library
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

// Importing react-router-dom hooks for navigation
import { useNavigate } from "react-router-dom";

// Importing useSelector hook from react-redux to access state from the Redux store
import { useSelector } from "react-redux";

// Importing dayjs library for date formatting
import dayjs from "dayjs";

// Importing components and styles
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
    // Create a ref for the carousel container to manage scrolling
    const carouselContainer = useRef();

    // Accessing the 'url' state from the Redux store using useSelector hook
    const { url } = useSelector((state) => state.home);

    // Create a navigate function using useNavigate hook to handle navigation
    const navigate = useNavigate();

    // Function to handle carousel navigation (left and right)
    const navigation = (dir) => {
        const container = carouselContainer.current;

        // Calculate the new scroll amount based on the direction (left or right)
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        // Perform smooth scrolling to the new position
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    // Function to render a skeleton item while loading
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {/* Render the carousel title if provided */}
                {title && <div className="carouselTitle">{title}</div>}

                {/* Left and right navigation arrows */}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {/* Check if data is loaded */}
                {!loading ? (
                    // Render the carousel items if data is available
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            // Get the poster URL for the current item
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;

                            // Return the carousel item with poster, rating, genres, and text block
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item.media_type || endpoint}/${
                                                item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        {/* Display the movie or TV show poster */}
                                        <Img src={posterUrl} />

                                        {/* Display the circle rating component */}
                                        <CircleRating
                                            rating={item.vote_average.toFixed(
                                                1
                                            )}
                                        />

                                        {/* Display the genres */}
                                        <Genres
                                            data={item.genre_ids.slice(0, 2)}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        {/* Display the movie or TV show title */}
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>

                                        {/* Display the release date or first air date */}
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Render loading skeleton if data is still loading
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
