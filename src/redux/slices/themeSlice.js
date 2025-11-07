import { createSlice } from '@reduxjs/toolkit';
import { darkTheme, lightTheme } from '../../styles/themes';

const initialState = {
  isDarkMode: false,
  currentTheme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggle between light and dark mode
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.currentTheme = state.isDarkMode ? darkTheme : lightTheme;
    },
    
    // Set specific theme mode
    setThemeMode: (state, action) => {
      state.isDarkMode = action.payload;
      state.currentTheme = action.payload ? darkTheme : lightTheme;
    },
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;