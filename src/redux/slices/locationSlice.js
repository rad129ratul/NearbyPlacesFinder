import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as locationService from '../../services/locationService';

export const requestLocationPermission = createAsyncThunk(
  'location/requestPermission',
  async (_, { rejectWithValue }) => {
    try {
      const granted = await locationService.requestPermission();
      return granted;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentLocation = createAsyncThunk(
  'location/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const location = await locationService.getCurrentLocation();
      return location;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startLocationTracking = createAsyncThunk(
  'location/startTracking',
  async (callback, { rejectWithValue }) => {
    try {
      await locationService.watchLocation(callback);
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentLocation: null,
  permissionStatus: null,
  isTracking: false,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.error = null;
    },
    
    stopTracking: (state) => {
      state.isTracking = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLocationPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestLocationPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissionStatus = action.payload ? 'granted' : 'denied';
        if (!action.payload) {
          state.error = 'Location permission denied';
        }
      })
      .addCase(requestLocationPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.permissionStatus = 'denied';
      });

    builder
      .addCase(getCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(startLocationTracking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startLocationTracking.fulfilled, (state) => {
        state.loading = false;
        state.isTracking = true;
      })
      .addCase(startLocationTracking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isTracking = false;
      });
  },
});

export const { setCurrentLocation, stopTracking, clearError } = locationSlice.actions;
export default locationSlice.reducer;