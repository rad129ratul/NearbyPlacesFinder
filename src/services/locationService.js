import * as Location from 'expo-location';
import { LOCATION_SETTINGS, ERROR_MESSAGES } from '../utils/constants';

let locationSubscription = null;

export const requestPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error(ERROR_MESSAGES.LOCATION_PERMISSION_DENIED);
    }
    
    return true;
  } catch (error) {
    console.error('Permission request error:', error);
    throw error;
  }
};

export const checkPermission = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};

export const getCurrentLocation = async () => {
  try {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      throw new Error(ERROR_MESSAGES.LOCATION_PERMISSION_DENIED);
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      accuracy: location.coords.accuracy,
      heading: location.coords.heading,
      speed: location.coords.speed,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Get location error:', error);
    throw new Error(ERROR_MESSAGES.LOCATION_UNAVAILABLE);
  }
};

export const watchLocation = async (callback) => {
  try {
    if (locationSubscription) {
      locationSubscription.remove();
    }

    const hasPermission = await checkPermission();
    if (!hasPermission) {
      throw new Error(ERROR_MESSAGES.LOCATION_PERMISSION_DENIED);
    }

    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: LOCATION_SETTINGS.UPDATE_INTERVAL,
        distanceInterval: LOCATION_SETTINGS.DISTANCE_FILTER,
      },
      (location) => {
        const formattedLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude,
          accuracy: location.coords.accuracy,
          heading: location.coords.heading,
          speed: location.coords.speed,
          timestamp: location.timestamp,
        };
        
        if (callback && typeof callback === 'function') {
          callback(formattedLocation);
        }
      }
    );
  } catch (error) {
    console.error('Watch location error:', error);
    throw new Error(ERROR_MESSAGES.LOCATION_UNAVAILABLE);
  }
};

export const stopWatchingLocation = () => {
  if (locationSubscription) {
    locationSubscription.remove();
    locationSubscription = null;
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; 
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
};

export default {
  requestPermission,
  checkPermission,
  getCurrentLocation,
  watchLocation,
  stopWatchingLocation,
  calculateDistance,
};