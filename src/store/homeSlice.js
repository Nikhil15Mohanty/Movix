import { createSlice } from "@reduxjs/toolkit";

// Create a slice of the Redux store for the 'home' data
export const homeSlice = createSlice({
    // Name of the slice, used to access the state and actions later
    name: "home",
    // Initial state of the slice
    initialState: {
        // Initial state for the 'url' and 'genres' properties
        url: {},
        genres: {},
    },
    // Reducer functions that handle state changes
    reducers: {
        // Reducer to update the 'url' property with API configuration data
        getApiConfiguration: (state, action) => {
            // Set the 'url' property to the payload received in the action
            state.url = action.payload;
        },
        // Reducer to update the 'genres' property with genre data
        getGenres: (state, action) => {
            // Set the 'genres' property to the payload received in the action
            state.genres = action.payload;
        },
    },
});

// Extract action creators from the homeSlice to use in other parts of the app
export const { getApiConfiguration, getGenres } = homeSlice.actions;

// Export the reducer function to be used in the Redux store
export default homeSlice.reducer;
