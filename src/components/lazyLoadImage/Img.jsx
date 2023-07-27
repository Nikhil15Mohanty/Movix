import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Img Component
// The Img component is a reusable component that wraps the LazyLoadImage component from the 'react-lazy-load-image-component' library.
// It provides a convenient way to render images with lazy loading and a blur effect while loading.

// Props:
// - src: The URL of the image to be displayed. This is a required prop.
// - className: Additional CSS class name(s) to be applied to the image. Optional prop.

const Img = ({ src, className }) => {
    return (
        // LazyLoadImage Component:
        // The LazyLoadImage component is used for lazy loading images, which means the image will be loaded only when it comes into the viewport.
        // It helps improve page load performance by delaying the loading of images that are not currently visible.
        // The 'src' prop is the URL of the image to be loaded.
        // The 'effect' prop specifies the blur effect to be applied while the image is loading.
        <LazyLoadImage
            className={className || ""} // The 'className' prop allows you to add custom CSS class names to the image element.
            alt="" // The 'alt' prop is used to provide alternative text for the image, but it is left empty here since it's not required for this component.
            effect="blur" // The 'effect' prop is set to "blur" to apply a blur effect while the image is loading. The blur effect helps enhance the user experience during loading.
            src={src} // The 'src' prop contains the URL of the image to be displayed. This prop is required.
        />
    );
};

export default Img;
