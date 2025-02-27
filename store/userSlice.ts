import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  message?: string;
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    profileImage?: string;
    role?: string;
  };
}

const initialState: UserState = {
  message: "",
  token: "",
  user: {
    id: "",
    fullName: "",
    email: "",
    profileImage: "",
    role: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.message !== undefined) {
        state.message = action.payload.message;
      }
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      }
      if (action.payload.user !== undefined) {
        state.user = { ...state.user, ...action.payload.user };
      }
    },
    clearUser: (state) => {
      state.message = "";
      state.token = "";
      state.user = {
        id: "",
        fullName: "",
        email: "",
        profileImage: "",
        role: "",
      };
    },
  },
});

export const getUserToken = (state: RootState) => state.user.token;
export const getUser = (state: RootState) => state.user.user;

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
