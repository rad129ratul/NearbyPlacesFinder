import { calculateDistance } from '../utils/helpers';

const MOCK_PLACES = [
  {
    id: '1',
    name: 'The Westin Dhaka',
    category: 'food',
    latitude: 23.8103,
    longitude: 90.4125,
    rating: 4.5,
    address: 'Main Gulshan Avenue, Dhaka',
    phone: '+880-2-222264090',
    openNow: true,
  },
  {
    id: '2',
    name: 'Khazana Restaurant',
    category: 'food',
    latitude: 23.7925,
    longitude: 90.4078,
    rating: 4.3,
    address: 'Gulshan 1, Dhaka',
    phone: '+880-1711-000000',
    openNow: true,
  },
  {
    id: '3',
    name: 'Dhaba Express',
    category: 'food',
    latitude: 23.8156,
    longitude: 90.4198,
    rating: 4.1,
    address: 'Banani Road 11, Dhaka',
    phone: '+880-1712-000000',
    openNow: false,
  },
  
  {
    id: '4',
    name: 'Coffee World',
    category: 'cafes',
    latitude: 23.8094,
    longitude: 90.4152,
    rating: 4.4,
    address: 'Gulshan Avenue, Dhaka',
    phone: '+880-1713-000000',
    openNow: true,
  },
  {
    id: '5',
    name: 'Gloria Jeans',
    category: 'cafes',
    latitude: 23.7889,
    longitude: 90.4145,
    rating: 4.2,
    address: 'Gulshan 2, Dhaka',
    phone: '+880-1714-000000',
    openNow: true,
  },
  
  {
    id: '6',
    name: 'Bashundhara City',
    category: 'shops',
    latitude: 23.7507,
    longitude: 90.3883,
    rating: 4.6,
    address: 'Panthapath, Dhaka',
    phone: '+880-2-8189186',
    openNow: true,
  },
  {
    id: '7',
    name: 'Jamuna Future Park',
    category: 'shops',
    latitude: 23.8103,
    longitude: 90.4292,
    rating: 4.5,
    address: 'Baridhara, Dhaka',
    phone: '+880-2-8401234',
    openNow: true,
  },
  {
    id: '8',
    name: 'Rifles Square',
    category: 'shops',
    latitude: 23.8145,
    longitude: 90.4167,
    rating: 4.0,
    address: 'Mohakhali, Dhaka',
    phone: '+880-1715-000000',
    openNow: false,
  },
  
  {
    id: '9',
    name: 'United Hospital',
    category: 'hospitals',
    latitude: 23.8078,
    longitude: 90.4161,
    rating: 4.7,
    address: 'Gulshan 2, Dhaka',
    phone: '+880-2-8836000',
    openNow: true,
  },
  {
    id: '10',
    name: 'Square Hospital',
    category: 'hospitals',
    latitude: 23.7507,
    longitude: 90.3883,
    rating: 4.6,
    address: 'Panthapath, Dhaka',
    phone: '+880-2-8159457',
    openNow: true,
  },
  {
    id: '11',
    name: 'Apollo Hospital',
    category: 'hospitals',
    latitude: 23.8234,
    longitude: 90.4289,
    rating: 4.5,
    address: 'Bashundhara R/A, Dhaka',
    phone: '+880-2-8401661',
    openNow: true,
  },
  
  {
    id: '12',
    name: 'Padma Oil Station',
    category: 'gas',
    latitude: 23.8089,
    longitude: 90.4089,
    rating: 4.0,
    address: 'Gulshan Avenue, Dhaka',
    phone: '+880-1716-000000',
    openNow: true,
  },
  {
    id: '13',
    name: 'Meghna Petroleum',
    category: 'gas',
    latitude: 23.8178,
    longitude: 90.4223,
    rating: 3.9,
    address: 'Mohakhali, Dhaka',
    phone: '+880-1717-000000',
    openNow: true,
  },
];

const simulateDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getNearbyPlaces = async (latitude, longitude, category = 'all') => {
  try {
    await simulateDelay();

    const placesWithDistance = MOCK_PLACES.map(place => ({
      ...place,
      distance: calculateDistance(
        latitude,
        longitude,
        place.latitude,
        place.longitude
      ),
    }));

    let filteredPlaces = placesWithDistance;
    if (category && category !== 'all') {
      filteredPlaces = placesWithDistance.filter(
        place => place.category === category
      );
    }

    filteredPlaces.sort((a, b) => a.distance - b.distance);

    return filteredPlaces;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw new Error('Failed to fetch nearby places');
  }
};

export const searchPlaces = async (query, latitude, longitude) => {
  try {
    await simulateDelay();

    if (!query || query.trim() === '') {
      return getNearbyPlaces(latitude, longitude);
    }

    const searchTerm = query.toLowerCase().trim();
    const results = MOCK_PLACES
      .map(place => ({
        ...place,
        distance: calculateDistance(
          latitude,
          longitude,
          place.latitude,
          place.longitude
        ),
      }))
      .filter(
        place =>
          place.name.toLowerCase().includes(searchTerm) ||
          place.category.toLowerCase().includes(searchTerm) ||
          place.address.toLowerCase().includes(searchTerm)
      );

    results.sort((a, b) => a.distance - b.distance);

    return results;
  } catch (error) {
    console.error('Error searching places:', error);
    throw new Error('Failed to search places');
  }
};

export const getPlaceById = async (placeId) => {
  try {
    await simulateDelay(300);

    const place = MOCK_PLACES.find(p => p.id === placeId);
    
    if (!place) {
      throw new Error('Place not found');
    }

    return place;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

export const getPlacesByCategory = async (category, latitude, longitude) => {
  try {
    await simulateDelay();

    if (category === 'all') {
      return getNearbyPlaces(latitude, longitude);
    }

    const placesWithDistance = MOCK_PLACES
      .filter(place => place.category === category)
      .map(place => ({
        ...place,
        distance: calculateDistance(
          latitude,
          longitude,
          place.latitude,
          place.longitude
        ),
      }));

    placesWithDistance.sort((a, b) => a.distance - b.distance);

    return placesWithDistance;
  } catch (error) {
    console.error('Error fetching places by category:', error);
    throw new Error('Failed to fetch places');
  }
};

export default {
  getNearbyPlaces,
  searchPlaces,
  getPlaceById,
  getPlacesByCategory,
};