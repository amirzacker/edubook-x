import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  refreshToken as refreshTokenRedux,
  registerStart,
  registerSuccess,
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../toolkit/requestMethods";
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

export const login = async (dispatch, user, callback) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login_check", user);
    dispatch(loginSuccess(res.data));
    if (callback) callback(); // Redirection après la connexion réussie
  } catch (err) {
    dispatch(loginFailure());
  }
};


export const refreshToken = async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const refreshToken = currentUser?.refresh_token;

  try {
    const res = await publicRequest.post("/token/refresh", {
      refresh_token: refreshToken,
    });
    const updatedUser = {
      ...currentUser,
      token: res.data.token,
      refreshToken: res.data.refresh_token,
    };
    dispatch(refreshTokenRedux(updatedUser));
    localStorage.setItem(
      "persist:root",
      JSON.stringify({ ...user, currentUser: updatedUser })
    );
  } catch (err) {
    console.error("Error refreshing token", err);
    // Gérer l'erreur de rafraîchissement ici
  }
};

export const logout = (dispatch) => {
  dispatch(logoutStart()); // Utilisation de l'action logout définie dans userSlice
};

export const register = async (dispatch, newUser) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/register", newUser);
    dispatch(registerSuccess(res.data));
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const updateUser = async (dispatch, userInfo) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/user`, userInfo);
    dispatch(updateUserSuccess(res.data));
    const persistedState = JSON.parse(localStorage.getItem("persist:root"));
    persistedState.user.currentUser.user = {
      ...persistedState.user.currentUser.user,
      ...res.data,
    };
    localStorage.setItem("persist:root", JSON.stringify(persistedState));
  } catch (err) {
    dispatch(updateUserFailure());
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
