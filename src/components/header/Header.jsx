import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi"; // Icon for the search button
import { SlMenu } from "react-icons/sl"; // Icon for the mobile menu button
import { VscChromeClose } from "react-icons/vsc"; // Icon for the close button
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper"; // Importing the ContentWrapper component
import logo from "../../assets/movix-logo.svg"; // Importing the logo image

const Header = () => {
    const [show, setShow] = useState("top"); // State to manage the header visibility
    const [lastScrollY, setLastScrollY] = useState(0); // State to keep track of the last scroll position
    const [mobileMenu, setMobileMenu] = useState(false); // State to manage the mobile menu visibility
    const [query, setQuery] = useState(""); // State to store the search query
    const [showSearch, setShowSearch] = useState(""); // State to manage the search bar visibility
    const navigate = useNavigate(); // React Router hook to handle navigation
    const location = useLocation(); // React Router hook to get the current location

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top whenever the location changes
    }, [location]);

    // Function to control the header visibility based on the scroll position
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide"); // Hide the header on scroll down if not in mobile menu
            } else {
                setShow("show"); // Show the header on scroll up or if in mobile menu
            }
        } else {
            setShow("top"); // Show the header at the top of the page
        }
        setLastScrollY(window.scrollY); // Update the last scroll position
    };

    useEffect(() => {
        // Add controlNavbar as an event listener to scroll events
        window.addEventListener("scroll", controlNavbar);
        return () => {
            // Cleanup: Remove the event listener when the component unmounts
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    // Function to handle search query submission
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            // Navigate to the search results page with the search query
            navigate(`/search/${query}`);
            // Set showSearch to false after a delay (1 second) to close the search bar
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    // Function to open the search bar when the search icon is clicked
    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    // Function to open the mobile menu when the menu icon is clicked
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    // Function to handle navigation based on the type (movie or TV show)
    const navigationHandler = (type) => {
        if (type === "movie") {
            // Navigate to the movie exploration page
            navigate("/explore/movie");
        } else {
            // Navigate to the TV show exploration page
            navigate("/explore/tv");
        }
        // Close the mobile menu after navigation
        setMobileMenu(false);
    };

    return (
        // The header element with dynamic class names based on the header state
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            {/* ContentWrapper component to wrap the header content */}
            <ContentWrapper>
                {/* Logo of the website with a click event to navigate to the home page */}
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                {/* List of menu items for Movies, TV Shows, and Search */}
                <ul className="menuItems">
                    {/* Menu item for Movies with a click event to navigate to the movie exploration page */}
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    {/* Menu item for TV Shows with a click event to navigate to the TV show exploration page */}
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    {/* Search icon with a click event to open the search bar */}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                {/* Mobile menu icons (search icon and close icon) */}
                <div className="mobileMenuItems">
                    {/* Search icon with a click event to open the search bar */}
                    <HiOutlineSearch onClick={openSearch} />
                    {/* If mobileMenu is true, show the close icon; otherwise, show the menu icon */}
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
    // Conditional rendering of the search bar if showSearch is true
    <div className="searchBar">
        {/* ContentWrapper component to wrap the search bar content */}
        <ContentWrapper>
            <div className="searchInput">
                {/* Input field for entering the search query */}
                <input
                    type="text"
                    placeholder="Search for a movie or tv show...."
                    onChange={(e) => setQuery(e.target.value)} // Event handler to update the query state on input change
                    onKeyUp={searchQueryHandler} // Event handler to trigger search on "Enter" key press
                />
                {/* Close icon to hide the search bar when clicked */}
                <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
        </ContentWrapper>
    </div>
)}

        </header>
    );
};

export default Header;
