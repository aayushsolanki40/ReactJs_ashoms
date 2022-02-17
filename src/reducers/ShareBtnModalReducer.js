import { createSlice } from "@reduxjs/toolkit";

export const sharebtnSlice = createSlice({
    name: "sharebtnmodal",
    initialState: { value: false },
    reducers: {
        showsharemodal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { showsharemodal } = sharebtnSlice.actions;

export default sharebtnSlice.reducer;