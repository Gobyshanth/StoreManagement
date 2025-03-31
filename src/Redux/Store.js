import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../Redux/Slices/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
