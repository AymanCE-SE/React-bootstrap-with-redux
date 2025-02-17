// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { addNewUser, getAllUsers, getUserById } from "../api/userapi";

// const initialState = {
//     users: [],
//     currentUser: null, 
//     isLoading: true,
//     errors: null,
// };



// export const getAllUsersAction = createAsyncThunk(
//     "user/getAllUsersAction",
//     async (args, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try {
//             let response = await getAllUsers();
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

// export const getUserByIdAction = createAsyncThunk(
//     "user/getUserByIdAction",
//     async (userId, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try {
//             let response = await getUserById(userId);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );


// export const registerUserAction = createAsyncThunk(
//     "user/registerUserAction",
//     async (user, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try {
//             let response = await addNewUser(user);
//             localStorage.setItem("user", JSON.stringify(response.data)); 
//             return response.data; 
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

// export const loginUserAction = createAsyncThunk(
//     "user/loginUserAction",
//     async (user, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try {
//             let response = await getAllUsers();
//             const foundUser = response.data.find(
//                 (existingUser) =>
//                     existingUser.email === user.email && existingUser.password === user.password
//             );
//             if (foundUser) {
//                 localStorage.setItem("user", JSON.stringify(foundUser)); 
//                 return foundUser; 
//             } else {
//                 return rejectWithValue("Invalid email or password");
//             }
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

// export const logoutUserAction = createAsyncThunk(
//     "user/logoutUserAction",
//     async (args, thunkAPI) => {
//         localStorage.removeItem("user"); 
//         return null; 
//     }
// );

// builder.addCase(logoutUserAction.fulfilled, (state) => {
//     state.currentUser = null; 
// });


// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {

//         builder.addCase(getAllUsersAction.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.users = action.payload;
//         });
//         builder.addCase(getAllUsersAction.rejected, (state, action) => {
//             state.isLoading = false;
//             state.errors = action.payload;
//         });
    
//         builder.addCase(registerUserAction.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.currentUser = action.payload; 
//         });
    
//         builder.addCase(loginUserAction.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.currentUser = action.payload; 
//         });
    
//         builder.addCase(registerUserAction.rejected, (state, action) => {
//             state.isLoading = false;
//             state.errors = action.payload;
//         });
    
//         builder.addCase(loginUserAction.rejected, (state, action) => {
//             state.isLoading = false;
//             state.errors = action.payload;
//         });

//         builder.addCase(logoutUserAction.fulfilled, (state) => {
//             state.currentUser = null; 
//         });
//     },

// });

// export const userReducer = userSlice.reducer;


