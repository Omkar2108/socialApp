import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const username = localStorage.getItem("username");
const auth = localStorage.getItem("auth");

const initialState = {
  username: username ? username : null,
  isLoading: false,
  isSuccess: false,
  auth: auth ? auth : null,
  isError: false,
  msg: "",
};

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (user, thunkAPI) => {
    if(user.auth && user.username){
      return axios.get('/check')
      .then(res=>{
        return res.data;
      }).catch(err=>{
        return thunkAPI.rejectWithValue(err);
      })
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  if (user.username === "" || user.password === "") {
    return thunkAPI.rejectWithValue({ msg: "Enter Valid Credentials" });
  }
  return await axios
    .post("/", user)
    .then((res) => {
      if (res.data.auth) {
        localStorage.setItem("auth", res.data.auth);
        localStorage.setItem("username", res.data.username);
      }
      return res.data;
    })
    .catch((err) => {
      return thunkAPI.rejectWithValue(err.response.data);
    });
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    if (user.username === "" || user.password === "") {
      return thunkAPI.rejectWithValue({ msg: "Enter Valid Credentials" });
    }
    return await axios
      .post("/register", user)
      .then((res) => {
        if (res.data.auth) {
          localStorage.setItem("auth", res.data.auth);
          localStorage.setItem("username", res.data.username);
        }
        return res.data;
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err.response.data);
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.auth = action.payload.auth;
        state.msg = action.payload.msg;
        state.username = action.payload.username;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.msg = action.payload.msg;
      })

      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.auth = action.payload.auth;
        state.msg = action.payload.msg;
        state.username = action.payload.username;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.msg = action.payload.msg;
      })

      // Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.msg = action.payload.msg;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.msg = action.payload.msg;
      })
  },
});

export default authSlice.reducer;
