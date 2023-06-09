import { configureStore } from "@reduxjs/toolkit";
import columnReducer from "./columnSlice";
import iconReduser from "./iconSlice";
export default configureStore({
  reducer: {
    columns: columnReducer,
    icons: iconReduser,
  },
});
