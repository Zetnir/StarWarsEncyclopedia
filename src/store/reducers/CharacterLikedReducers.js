import { createSlice } from "@reduxjs/toolkit";

export const characterLikedSlice = createSlice({
  name: "characterLiked",
  initialState: {
    value: [],
  },
  reducers: {
    addCharacter: (state, action) => {
      if (
        state.value !== [] &&
        !state.value.find((character) => character.id == action.payload.id)
      )
        state.value.push(action.payload);
    },
    removeCharacter: (state, action) => {
      if (state.value !== []) {
        const index = state.value
          .map((item) => item.id)
          .indexOf(action.payload.id);
        if (index >= 0) {
          state.value.splice(index, 1);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCharacter, removeCharacter } = characterLikedSlice.actions;

export default characterLikedSlice.reducer;
