import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {

  pastes: localStorage.getItem("pastes") ?
    JSON.parse(localStorage.getItem("pastes")) :
    []

};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste added successfully");
    },
    updatePaste: (state, action) => {
      const paste = state.pastes.find(p => p._id === action.payload._id)

      if (paste) {
        paste.title = action.payload.title;
        paste.content = action.payload.content;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    deletePaste: (state, action) => {
      const pasteId = action.payload;
      const pastes = state.pastes.filter(p => p._id !== pasteId);

      localStorage.setItem("pastes", JSON.stringify(pastes));
      toast.success("Paste deleted successfully");
      state.pastes = pastes;

    },
    getPaste: (state, action) => {
      const paste = state.pastes.find(p => p._id === action.payload._id)

    }
  },
});

export const { addPaste, updatePaste, deletePaste } = pasteSlice.actions;
export default pasteSlice.reducer;
