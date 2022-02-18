import { createSlice } from "@reduxjs/toolkit";

export const headerMenuSlice = createSlice({
    name: "headermenutab",
    initialState: { value: { currentpath: "/home", headerfootershow: true } },
    reducers: {
        setheadermenuData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setheadermenuData } = headerMenuSlice.actions;
export default headerMenuSlice.reducer;