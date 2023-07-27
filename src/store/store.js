// Import the 'configureStore' function from '@reduxjs/toolkit'
import { configureStore } from "@reduxjs/toolkit";

// Import the 'homeSlice' reducer created earlier
import homeSlice from "./homeSlice";

// Create the Redux store using 'configureStore'
export const store = configureStore({
    // The 'reducer' option is an object that defines how state is updated in the store
    reducer: {
        // Define the 'home' slice in the store with the 'homeSlice' reducer
        home: homeSlice,
    },
});
