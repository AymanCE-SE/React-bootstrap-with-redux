import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewUser, getAllUsers, getUserById } from "../api/userapi";

// Get initial user from localStorage
const storedUser = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  users: [],
  currentUser: storedUser, // Initialize with stored user
  isLoading: false,
  errors: null,
};

export const getAllUsersAction = createAsyncThunk(
  "user/getAllUsersAction",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await getAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserByIdAction = createAsyncThunk(
  "user/getUserByIdAction",
  async (userId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await getUserById(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "user/registerUserAction",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await addNewUser(user);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "user/loginUserAction",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await getAllUsers();
      const foundUser = response.data.find(
        (existingUser) =>
          existingUser.email === user.email &&
          existingUser.password === user.password
      );
      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        return foundUser;
      } else {
        return rejectWithValue("Invalid email or password");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "user/logoutUserAction",
  async (_, thunkAPI) => {
    localStorage.removeItem("user");
    return null;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add a reducer to sync with localStorage
    syncWithLocalStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // getAllUsersAction
      .addCase(getAllUsersAction.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getAllUsersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      // registerUserAction
      .addCase(registerUserAction.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.errors = null;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      // loginUserAction
      .addCase(loginUserAction.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.errors = null;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      // logoutUserAction
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.currentUser = null;
        state.errors = null;
      });
  },
});

export const { syncWithLocalStorage } = userSlice.actions;
export const userReducer = userSlice.reducer;