import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as placesApi from '../../services/placesApi';

export const fetchNearbyPlaces = createAsyncThunk(
  'places/fetchNearby',
  async ({ latitude, longitude, category }, { rejectWithValue }) => {
    try {
      const places = await placesApi.getNearbyPlaces(latitude, longitude, category);
      return places;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPlaces = createAsyncThunk(
  'places/search',
  async ({ query, latitude, longitude }, { rejectWithValue }) => {
    try {
      const places = await placesApi.searchPlaces(query, latitude, longitude);
      return places;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allPlaces: [],
  filteredPlaces: [],
  selectedPlace: null,
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    
    clearSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
    
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      
      if (action.payload === 'all') {
        state.filteredPlaces = state.allPlaces;
      } else {
        state.filteredPlaces = state.allPlaces.filter(
          place => place.category === action.payload
        );
      }
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      
      if (action.payload.trim()) {
        const query = action.payload.toLowerCase();
        state.filteredPlaces = state.allPlaces.filter(place =>
          place.name.toLowerCase().includes(query) ||
          place.category.toLowerCase().includes(query)
        );
      } else {
        if (state.selectedCategory === 'all') {
          state.filteredPlaces = state.allPlaces;
        } else {
          state.filteredPlaces = state.allPlaces.filter(
            place => place.category === state.selectedCategory
          );
        }
      }
    },
    
    clearFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.filteredPlaces = state.allPlaces;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlaces = action.payload;
        
        if (state.selectedCategory === 'all' && !state.searchQuery) {
          state.filteredPlaces = action.payload;
        } else if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          state.filteredPlaces = action.payload.filter(place =>
            place.name.toLowerCase().includes(query)
          );
        } else {
          state.filteredPlaces = action.payload.filter(
            place => place.category === state.selectedCategory
          );
        }
      })
      .addCase(fetchNearbyPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(searchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredPlaces = action.payload;
      })
      .addCase(searchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedPlace,
  clearSelectedPlace,
  setCategory,
  setSearchQuery,
  clearFilters,
  clearError,
} = placesSlice.actions;

export default placesSlice.reducer;