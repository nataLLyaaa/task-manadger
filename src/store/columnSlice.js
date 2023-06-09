import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
const columnSlice = createSlice({
  name: "columns",
  initialState: {
    columns: [
      {
        id: uuid(),
        columnIcon: 0,
        name: "Новые",
      },
      {
        id: uuid(),
        columnIcon: 1,
        name: "В процессе",
      },
      {
        id: uuid(),
        columnIcon: 2,
        name: "Завершенные",
      },
    ],
  },
  reducers: {
    deleteColumn(state, action) {},
    editColumnName(state, action) {},
    changeColumn(state, action) {},
  },
});

export const { deleteColum, editColumnName, changeColumn } =
  columnSlice.actions;

export default columnSlice.reducer;
