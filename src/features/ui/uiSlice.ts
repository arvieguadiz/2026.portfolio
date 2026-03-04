import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  darkMode: boolean;
  menuOpen: boolean;
}

const initialState: UiState = {
  darkMode: true,
  menuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
  },
});

export const { toggleTheme, setTheme, toggleMenu, closeMenu } = uiSlice.actions;
export default uiSlice.reducer;
