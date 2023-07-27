import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

// A global variable to store the filter options for API requests
let filters = {};

// Data for the "Sort by" dropdown menu
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    // State variables to store the fetched data, current page number, loading state, selected genre, and sort option
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);

    // Extract the mediaType parameter from the URL using useParams hook
    const { mediaType } = useParams();

    // Fetch genres data for the media type using custom useFetch hook
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    // Function to fetch the initial data when the component mounts
    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    // Function to fetch the next page data for infinite scrolling
    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    // Reset filters and fetch new data when mediaType changes
    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    // Callback function for handling dropdown selections (sort option and genre)
    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            // Update the state with the selected sort option
            setSortby(selectedItems);
            if (action.action !== "clear") {
                // Add the sort_by filter to the filters object if an option is selected
                filters.sort_by = selectedItems.value;
            } else {
                // If "clear" action is performed, remove the sort_by filter
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            // Update the state with the selected genre
            setGenre(selectedItems);
            if (action.action !== "clear") {
                // Extract genre IDs from the selected genres and add them to the filters object
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                // If "clear" action is performed, remove the with_genres filter
                delete filters.with_genres;
            }
        }

        // Reset the page number and fetch new data with updated filters
        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    {/* Display the page title based on the mediaType */}
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        {/* Dropdown for selecting genres */}
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        {/* Dropdown for selecting sort options */}
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {/* Show loading spinner when data is being fetched */}
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {/* Check if data exists and display content accordingly */}
                        {data?.results?.length > 0 ? (
                            // If there are results, enable InfiniteScroll for infinite scrolling effect
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {/* Map through the data to render MovieCard component for each item */}
                                {data?.results?.map((item, index) => {
                                    // Skip rendering MovieCard for "person" media type
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            // If no results, display a message
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
