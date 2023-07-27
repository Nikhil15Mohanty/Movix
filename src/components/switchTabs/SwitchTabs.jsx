import React, { useState } from "react";

import "./style.scss";

// SwitchTabs Component
// The SwitchTabs component is a reusable tab switcher component that allows users to toggle between different tabs.
// It accepts two props:
// - data: An array of strings representing the tab titles. Each string in the array corresponds to a tab option.
// - onTabChange: A callback function that will be called when the user selects a tab. It receives two arguments: the selected tab title and its index in the data array.

const SwitchTabs = ({ data, onTabChange }) => {
    // State variables:
    const [selectedTab, setSelectedTab] = useState(0); // 'selectedTab' stores the index of the currently selected tab.
    const [left, setLeft] = useState(0); // 'left' stores the left offset value for the moving background of the active tab.

    // activeTab function:
    // This function is called when a tab is clicked. It updates the 'selectedTab' state to the clicked tab's index and moves the background to the corresponding tab.
    const activeTab = (tab, index) => {
        setLeft(index * 100); // Calculate the left offset based on the clicked tab's index and set it as the 'left' state.
        setTimeout(() => {
            setSelectedTab(index); // Update the 'selectedTab' state after a short delay (300ms) to allow the background animation to complete smoothly.
        }, 300);
        onTabChange(tab, index); // Call the 'onTabChange' callback function with the selected tab title and its index as arguments.
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {/* Render the tab items */}
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)} // Call the 'activeTab' function when a tab is clicked.
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} /> {/* The moving background element */}
            </div>
        </div>
    );
};

export default SwitchTabs;
