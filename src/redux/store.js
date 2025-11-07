import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './slices/locationSlice';
import placesReducer from './slices/placesSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    places: placesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['location/setCurrentLocation'],
        ignoredPaths: ['location.timestamp'],
      },
    }),
});

export default store;