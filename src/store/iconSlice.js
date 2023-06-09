import { createSlice } from "@reduxjs/toolkit";
import Icon1 from "../svg/FreeIcons/Icon1/Icon1.tsx";
import Icon2 from "../svg/FreeIcons/Icon2/Icon2.tsx";
import Icon3 from "../svg/FreeIcons/Icon3/Icon3.tsx";
import Icon4 from "../svg/FreeIcons/Icon4/Icon4.tsx";
import Icon5 from "../svg/FreeIcons/Icon5/Icon5.tsx";
import Icon6 from "../svg/FreeIcons/Icon6/Icon6.tsx";
import Icon7 from "../svg/FreeIcons/Icon7/Icon7.tsx";
import Icon8 from "../svg/FreeIcons/Icon8/Icon8.tsx";
import Icon9 from "../svg/FreeIcons/Icon9/Icon9.tsx";

const iconSlice = createSlice({
  name: "icons",
  initialState: {
    icons: [
      <Icon1 />,
      <Icon2 />,
      <Icon8 />,
      <Icon5 />,
      <Icon3 />,
      <Icon4 />,
      <Icon6 />,
      <Icon7 />,
      <Icon9 />,
    ],
    reducers: {
      changeColumnIcon(state, action) {},
    },
  },
});

export const { changeColumnIcon } = iconSlice.actions;
export default iconSlice.reducer;
