export const CATEGORIES = {
  ALL: {
    id: 'all',
    name: 'All Places',
    icon: '🌍',
    color: '#6c757d'
  },
  FOOD: {
    id: 'food',
    name: 'Restaurants',
    icon: '🍽️',
    color: '#dc3545'
  },
  SHOPS: {
    id: 'shops',
    name: 'Shops',
    icon: '🛍️',
    color: '#ffc107'
  },
  HOSPITALS: {
    id: 'hospitals',
    name: 'Hospitals',
    icon: '🏥',
    color: '#198754'
  },
  CAFES: {
    id: 'cafes',
    name: 'Cafes',
    icon: '☕',
    color: '#6f42c1'
  },
  GAS_STATIONS: {
    id: 'gas',
    name: 'Gas Stations',
    icon: '⛽',
    color: '#fd7e14'
  }
};

// Bootstrap 5 color palette
export const COLORS = {
  // Primary colors
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  
  // Light theme
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    cardBackground: '#ffffff',
    inputBackground: '#f8f9fa'
  },
  
  // Dark theme
  dark: {
    background: '#212529',
    surface: '#343a40',
    text: '#f8f9fa',
    textSecondary: '#adb5bd',
    border: '#495057',
    cardBackground: '#2c3034',
    inputBackground: '#343a40'
  }
};

// Map configuration
export const MAP_CONFIG = {
  DEFAULT_REGION: {
    latitude: 23.8103,
    longitude: 90.4125,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  
  MARKER_SIZE: 40,
  USER_MARKER_SIZE: 20,
  
  ANIMATION_DURATION: 300,
  
  SEARCH_RADIUS: 5000, // 5 km
};

export const DISTANCE_UNITS = {
  METERS: 'm',
  KILOMETERS: 'km',
  MILES: 'mi'
};

// Location tracking settings
export const LOCATION_SETTINGS = {
  UPDATE_INTERVAL: 5000, // 5 seconds
  
  ACCURACY: {
    HIGH: 'high',
    BALANCED: 'balanced',
    LOW: 'low'
  },
  
  DISTANCE_FILTER: 10
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.yourbackend.com',
  PLACES: '/api/places',
  SEARCH: '/api/places/search',
  NEARBY: '/api/places/nearby'
};

export const RATING_CONFIG = {
  MAX_RATING: 5,
  MIN_RATING: 0,
  STAR_FILLED: '⭐',
  STAR_EMPTY: '☆'
};

// UI Constants
export const UI_CONSTANTS = {
  SCREEN_PADDING: 16,
  CARD_BORDER_RADIUS: 12,
  CARD_SHADOW_ELEVATION: 4,
  BUTTON_BORDER_RADIUS: 8,
  BUTTON_HEIGHT: 48,
  INPUT_HEIGHT: 48,
  INPUT_BORDER_RADIUS: 8,
  SPACING: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  }
};

// Error messages
export const ERROR_MESSAGES = {
  LOCATION_PERMISSION_DENIED: 'Location permission is required to use this app. Please enable it in your device settings.',
  LOCATION_UNAVAILABLE: 'Unable to get your current location. Please check your GPS settings.',
  NO_PLACES_FOUND: 'No places found nearby. Try adjusting your search filters.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOCATION_FOUND: 'Location found successfully',
  PLACES_LOADED: 'Places loaded successfully'
};

// Animation configurations
export const ANIMATIONS = {
  FADE_IN_DURATION: 300,
  SLIDE_UP_DURATION: 250,
  BOUNCE_DURATION: 400,
  SPRING_CONFIG: {
    tension: 50,
    friction: 7
  }
};

// Default export for easy access
export default {
  CATEGORIES,
  COLORS,
  MAP_CONFIG,
  DISTANCE_UNITS,
  LOCATION_SETTINGS,
  API_ENDPOINTS,
  RATING_CONFIG,
  UI_CONSTANTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ANIMATIONS
};