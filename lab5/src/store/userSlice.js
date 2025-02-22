import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewUser, getAllUsers, getUserById, editUser } from "../api/userapi";

// Get initial user from localStorage
const storedUser = localStorage.getItem("user") 
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  users: [],
  currentUser: storedUser,
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

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({ userId, userData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let response = await editUser(userId, userData);
      // Update localStorage if updating current user
      const storedUser = localStorage.getItem("user");
      if (storedUser && JSON.parse(storedUser).id === userId) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Keep your existing actions
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

      // getUserByIdAction
      .addCase(getUserByIdAction.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getUserByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update user in users array if exists
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(getUserByIdAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

      // updateUserAction
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update in users array
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Update currentUser if it's the same user
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })

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

      .addCase(logoutUserAction.fulfilled, (state) => {
        state.currentUser = null;
        state.errors = null;
      });
  },
});

export const { syncWithLocalStorage } = userSlice.actions;
export const userReducer = userSlice.reducer;