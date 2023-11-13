import { createSlice } from "@reduxjs/toolkit";

export const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    publications: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPublicationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPublicationSuccess: (state, action) => {
      state.isFetching = false;
      state.publications = action.payload;
    },
    getPublicationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deletePublicationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePublicationSuccess: (state, action) => {
      state.isFetching = false;
      state.publications.splice(
        state.publications.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deletePublicationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatePublicationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePublicationSuccess: (state, action) => {
      state.isFetching = false;
      state.publications[
        state.publications.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.publication;
    },
    updatePublicationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addPublicationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPublicationSuccess: (state, action) => {
      state.isFetching = false;
      state.publications.push(action.payload);
    },
    addPublicationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPublicationStart,
  getPublicationSuccess,
  getPublicationFailure,
  deletePublicationStart,
  deletePublicationSuccess,
  deletePublicationFailure,
  updatePublicationStart,
  updatePublicationSuccess,
  updatePublicationFailure,
  addPublicationStart,
  addPublicationSuccess,
  addPublicationFailure,
} = publicationSlice.actions;

export default publicationSlice.reducer;
