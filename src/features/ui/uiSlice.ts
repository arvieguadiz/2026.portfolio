import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  darkMode: boolean;
  menuOpen: boolean;
  hasDownloadedResume: boolean;
  resumeSnackbarOpen: boolean;
}

const initialState: UiState = {
  darkMode: localStorage.getItem('theme') !== 'light',
  menuOpen: false,
  hasDownloadedResume: localStorage.getItem('hasDownloadedResume') === 'true',
  resumeSnackbarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
    downloadResume: (state) => {
      state.hasDownloadedResume = true;
      state.resumeSnackbarOpen = true;
      localStorage.setItem('hasDownloadedResume', 'true');
    },
    closeResumeSnackbar: (state) => {
      state.resumeSnackbarOpen = false;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleMenu,
  closeMenu,
  downloadResume,
  closeResumeSnackbar,
} = uiSlice.actions;
export default uiSlice.reducer;
