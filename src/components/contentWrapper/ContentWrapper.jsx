import React from "react";

// Importing the custom style for the ContentWrapper component
import "./style.scss";

// The ContentWrapper component is a simple wrapper component that wraps its children inside a div with a specific class name.
const ContentWrapper = ({ children }) => {
    // The "children" prop contains the components or elements that are passed as children to the ContentWrapper component.

    return <div className="contentWrapper">{children}</div>;
    // The JSX code inside the return statement wraps the "children" inside a div element with the class name "contentWrapper".
};

export default ContentWrapper;
// Exporting the ContentWrapper component so that it can be used in other parts of the application.
