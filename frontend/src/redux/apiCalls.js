import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getPublicationFailure,
  getPublicationStart,
  getPublicationSuccess,
  deletePublicationFailure,
  deletePublicationStart,
  deletePublicationSuccess,
  updatePublicationFailure,
  updatePublicationStart,
  updatePublicationSuccess,
  addPublicationFailure,
  addPublicationStart,
  addPublicationSuccess,
} from "./publicationRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login_check", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getPublications = async (dispatch) => {
  dispatch(getPublicationStart());
  try {
    const res = await publicRequest.get("/publications");
    dispatch(getPublicationSuccess(res.data));
  } catch (err) {
    dispatch(getPublicationFailure());
  }
};

export const deletePublication = async (id, dispatch) => {
  dispatch(deletePublicationStart());
  try {
    dispatch(deletePublicationSuccess(id));
    await userRequest.delete(`/publications/${id}`);
  } catch (err) {
    dispatch(deletePublicationFailure());
  }
};

export const updatePublication = async (id, publication, dispatch) => {
  dispatch(updatePublicationStart());
  try {
    // update
    await userRequest.put(`/publications/${id}`, publication);
    dispatch(updatePublicationSuccess({ id, publication }));
  } catch (err) {
    dispatch(updatePublicationFailure());
  }
};
export const addPublication = async (publication, dispatch) => {
  dispatch(addPublicationStart());
  try {
    const res = await userRequest.post(`/publications`, publication);
    dispatch(addPublicationSuccess(res.data));
  } catch (err) {
    dispatch(addPublicationFailure());
  }
};
