import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ui from "./ui/reducer";
import services from "./services/reducer";

const store = configureStore({
  reducer: {
    ui,
    services,
  },
});

export const useAppDispatch = () => useDispatch();

export default store;
