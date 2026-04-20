import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UiState {
  themeMode: ThemeMode;
  menuOpen: boolean;
  hasDownloadedResume: boolean;
  resumeSnackbarOpen: boolean;
}

const initialState: UiState = {
  themeMode: (localStorage.getItem('theme') as ThemeMode) || 'system',
  menuOpen: false,
  hasDownloadedResume: localStorage.getItem('hasDownloadedResume') === 'true',
  resumeSnackbarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      localStorage.setItem('theme', action.payload);
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
  setThemeMode,
  toggleMenu,
  closeMenu,
  downloadResume,
  closeResumeSnackbar,
} = uiSlice.actions;
export default uiSlice.reducer;
