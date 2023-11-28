import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { generetaAuthError } from "../utils/generateAuthError";
import userService from "../services/user.service";

const initialState = localStorageService.getAccessToken()
    ? {
          currentuser: null,
          usersList: null,
          isCurrentUserLoading: false,
          isUsersLoading: false,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          usersLoaded: false
      }
    : {
          currentuser: null,
          users: null,
          isCurrentUserLoading: false,
          isUsersLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          usersLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        },
        currentUserRequested: (state) => {
            state.isCurrentUserLoading = true;
        },
        currentUserReceived: (state, action) => {
            state.currentuser = action.payload;
            state.isCurrentUserLoading = false;
        },
        currentUsersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isCurrentUserLoading = false;
        },
        userLoggedOut: (state) => {
            state.users = null;
            state.currentuser = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccessed: (state, action) => {
            state.currentuser = action.payload;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        userUpdateRequested: (state) => {
            state.error = null;
        },
        usersRequested: (state) => {
            state.isUsersLoading = true;
        },
        usersReceived: (state, action) => {
            state.usersList = action.payload;
            state.usersLoaded = true;
            state.isUsersLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isUsersLoading = false;
        },
        userRemoveRequested: (state) => {
            state.error = null;
        },
        userRemoveFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    authRequestSuccess,
    authRequested,
    authRequestFailed,
    currentUserRequested,
    currentUserReceived,
    currentUsersRequestFailed,
    userLoggedOut,
    userUpdateRequested,
    userUpdateSuccessed,
    userUpdateFailed,
    usersRequested,
    usersReceived,
    usersRequestFailed,
    userRemoveRequested,
    userRemoveFailed
} = actions;

const userRemoveSuccessed = createAction("users/userRemoveSuccessed ");

export const signUp = (payload, cb) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        cb();
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const login = (payload, cb) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        cb();
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const loadCurrentUser = () => async (dispatch) => {
    dispatch(currentUserRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(currentUserReceived(content));
    } catch (error) {
        dispatch(currentUsersRequestFailed(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccessed(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const removeUser = (userId) => async (dispatch) => {
    dispatch(userRemoveRequested());
    try {
        await userService.removeUser(userId);
        dispatch(userRemoveSuccessed());
        dispatch(loadUsersList());
    } catch (error) {
        dispatch(userRemoveFailed(error.message));
    }
};

export const logOut = (cb) => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    cb();
};

export const getUserById = (userId) => (state) => {
    if (state.users.usersList) {
        return state.users.usersList.find((u) => u._id === userId);
    }
};

export const getCurrentUserData = () => (state) => state.users.currentuser;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getAuthErrors = () => (state) => state.users.error;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurentUserLoadingStatus = () => (state) =>
    state.users.isCurrentUserLoading;
export const getDataStatus = () => (state) => state.users.usersLoaded;
export const getUsersList = () => (state) => state.users.usersList;

export default usersReducer;
