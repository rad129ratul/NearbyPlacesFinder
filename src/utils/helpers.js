import { CATEGORIES } from './constants';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} Distance in meters
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371e3; // Earth's radius in meters
  
  // Convert degrees to radians
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  
  return distance; // Returns distance in meters
};

/**
 * Format distance from meters to readable string
 * @param {number} meters - Distance in meters
 * @returns {string} Formatted distance string
 */
export const formatDistance = (meters) => {
  if (!meters && meters !== 0) {
    return 'N/A';
  }

  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  } else if (meters < 10000) {
    return `${(meters / 1000).toFixed(1)} km`;
  } else {
    return `${Math.round(meters / 1000)} km`;
  }
};

/**
 * Get category icon emoji
 * @param {string} category - Category name
 * @returns {string} Icon emoji
 */
export const getPlaceIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'food':
      return CATEGORIES.FOOD.icon;
    case 'shops':
      return CATEGORIES.SHOPS.icon;
    case 'hospitals':
      return CATEGORIES.HOSPITALS.icon;
    case 'cafes':
      return CATEGORIES.CAFES.icon;
    case 'gas':
      return CATEGORIES.GAS_STATIONS.icon;
    default:
      return CATEGORIES.ALL.icon;
  }
};

/**
 * Get category color
 * @param {string} category - Category name
 * @returns {string} Color hex code
 */
export const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'food':
      return CATEGORIES.FOOD.color;
    case 'shops':
      return CATEGORIES.SHOPS.color;
    case 'hospitals':
      return CATEGORIES.HOSPITALS.color;
    case 'cafes':
      return CATEGORIES.CAFES.color;
    case 'gas':
      return CATEGORIES.GAS_STATIONS.color;
    default:
      return CATEGORIES.ALL.color;
  }
};

/**
 * Get category display name
 * @param {string} category - Category id
 * @returns {string} Display name
 */
export const getCategoryName = (category) => {
  switch (category?.toLowerCase()) {
    case 'food':
      return CATEGORIES.FOOD.name;
    case 'shops':
      return CATEGORIES.SHOPS.name;
    case 'hospitals':
      return CATEGORIES.HOSPITALS.name;
    case 'cafes':
      return CATEGORIES.CAFES.name;
    case 'gas':
      return CATEGORIES.GAS_STATIONS.name;
    case 'all':
      return CATEGORIES.ALL.name;
    default:
      return 'Unknown';
  }
};

/**
 * Format rating to one decimal place
 * @param {number} rating - Rating value
 * @returns {string} Formatted rating
 */
export const formatRating = (rating) => {
  if (!rating && rating !== 0) {
    return 'N/A';
  }
  return rating.toFixed(1);
};

/**
 * Generate star rating display
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star string
 */
export const getStarRating = (rating) => {
  if (!rating && rating !== 0) {
    return '☆☆☆☆☆';
  }
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
};

/**
 * Check if place is open now
 * @param {boolean} openNow - Open status
 * @returns {string} Status text
 */
export const getOpenStatus = (openNow) => {
  return openNow ? 'Open Now' : 'Closed';
};

/**
 * Get open status color
 * @param {boolean} openNow - Open status
 * @returns {string} Color hex code
 */
export const getOpenStatusColor = (openNow) => {
  return openNow ? '#198754' : '#dc3545';
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate estimated time to reach destination
 * @param {number} distanceInMeters - Distance in meters
 * @param {number} speedKmh - Average speed in km/h (default: 40)
 * @returns {string} Estimated time string
 */
export const estimateTime = (distanceInMeters, speedKmh = 40) => {
  const distanceKm = distanceInMeters / 1000;
  const timeHours = distanceKm / speedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  if (timeMinutes < 1) {
    return '< 1 min';
  } else if (timeMinutes < 60) {
    return `${timeMinutes} min`;
  } else {
    const hours = Math.floor(timeMinutes / 60);
    const minutes = timeMinutes % 60;
    return `${hours}h ${minutes}m`;
  }
};

/**
 * Sort places by distance
 * @param {Array} places - Array of places
 * @param {boolean} ascending - Sort order (default: true)
 * @returns {Array} Sorted places
 */
export const sortByDistance = (places, ascending = true) => {
  return [...places].sort((a, b) => {
    const comparison = a.distance - b.distance;
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sort places by rating
 * @param {Array} places - Array of places
 * @param {boolean} ascending - Sort order (default: false)
 * @returns {Array} Sorted places
 */
export const sortByRating = (places, ascending = false) => {
  return [...places].sort((a, b) => {
    const comparison = a.rating - b.rating;
    return ascending ? comparison : -comparison;
  });
};

/**
 * Filter places by maximum distance
 * @param {Array} places - Array of places
 * @param {number} maxDistance - Maximum distance in meters
 * @returns {Array} Filtered places
 */
export const filterByMaxDistance = (places, maxDistance) => {
  return places.filter(place => place.distance <= maxDistance);
};

/**
 * Filter places by minimum rating
 * @param {Array} places - Array of places
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered places
 */
export const filterByMinRating = (places, minRating) => {
  return places.filter(place => place.rating >= minRating);
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default {
  calculateDistance,
  formatDistance,
  getPlaceIcon,
  getCategoryColor,
  getCategoryName,
  formatRating,
  getStarRating,
  getOpenStatus,
  getOpenStatusColor,
  truncateText,
  estimateTime,
  sortByDistance,
  sortByRating,
  filterByMaxDistance,
  filterByMinRating,
  debounce,
};