import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapDisplay from '../components/Map/MapDisplay';
import SearchBar from '../components/UI/SearchBar';
import {
  getCurrentLocation,
  requestLocationPermission,
  setCurrentLocation,
} from '../redux/slices/locationSlice';
import { clearSelectedPlace, fetchNearbyPlaces } from '../redux/slices/placesSlice';
import { ERROR_MESSAGES, UI_CONSTANTS } from '../utils/constants';
import { formatDistance, formatRating, getPlaceIcon } from '../utils/helpers';

const MapScreen = () => {
  const dispatch = useDispatch();
  const [showPlaceDetails, setShowPlaceDetails] = useState(false);
  
  const { currentLocation, loading: locationLoading, error: locationError } = useSelector(
    state => state.location
  );
  const { selectedPlace, selectedCategory } = useSelector(state => state.places);
  const { currentTheme } = useSelector(state => state.theme);

  // Initialize location on mount
  useEffect(() => {
    initializeLocation();
  }, []);

  // Fetch places when location changes
  useEffect(() => {
    if (currentLocation) {
      loadNearbyPlaces();
    }
  }, [currentLocation, selectedCategory]);

  // Show place details when place is selected
  useEffect(() => {
    setShowPlaceDetails(!!selectedPlace);
  }, [selectedPlace]);

  const initializeLocation = async () => {
    try {
      const permissionResult = await dispatch(requestLocationPermission()).unwrap();
      
      if (permissionResult) {
        const location = await dispatch(getCurrentLocation()).unwrap();
        dispatch(setCurrentLocation(location));
      }
    } catch (error) {
      console.error('Location initialization error:', error);
    }
  };

  const loadNearbyPlaces = async () => {
    if (!currentLocation) return;

    try {
      await dispatch(
        fetchNearbyPlaces({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          category: selectedCategory,
        })
      ).unwrap();
    } catch (error) {
      console.error('Error loading places:', error);
    }
  };

  const handleClosePlaceDetails = () => {
    dispatch(clearSelectedPlace());
    setShowPlaceDetails(false);
  };

  // Loading state
  if (locationLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: currentTheme.colors.background }]}>
        <ActivityIndicator size="large" color={currentTheme.colors.primary} />
        <Text style={[styles.loadingText, { color: currentTheme.colors.text }]}>
          Loading map...
        </Text>
      </View>
    );
  }

  // Error state
  if (locationError) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: currentTheme.colors.background }]}>
        <Text style={styles.errorIcon}>📍</Text>
        <Text style={[styles.errorTitle, { color: currentTheme.colors.text }]}>
          Location Access Required
        </Text>
        <Text style={[styles.errorMessage, { color: currentTheme.colors.textSecondary }]}>
          {ERROR_MESSAGES.LOCATION_PERMISSION_DENIED}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Full-screen Map */}
      <MapDisplay />

      {/* Floating Search Bar */}
      <View style={[
        styles.searchContainer,
        { backgroundColor: currentTheme.colors.background }
      ]}>
        <SearchBar placeholder="Search on map..." />
      </View>

      {/* Place Details Card */}
      {showPlaceDetails && selectedPlace && (
        <View style={[
          styles.placeDetailsCard,
          { backgroundColor: currentTheme.colors.cardBackground }
        ]}>
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePlaceDetails}
            activeOpacity={0.7}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>

          {/* Place Info */}
          <View style={styles.placeHeader}>
            <View style={styles.placeIconContainer}>
              <Text style={styles.placeIconLarge}>
                {getPlaceIcon(selectedPlace.category)}
              </Text>
            </View>
            
            <View style={styles.placeMainInfo}>
              <Text 
                style={[styles.placeName, { color: currentTheme.colors.text }]}
                numberOfLines={2}
              >
                {selectedPlace.name}
              </Text>
              
              {selectedPlace.rating && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={[styles.ratingText, { color: currentTheme.colors.text }]}>
                    {formatRating(selectedPlace.rating)}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            {/* Distance */}
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📍</Text>
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: currentTheme.colors.textSecondary }]}>
                  Distance
                </Text>
                <Text style={[styles.detailValue, { color: currentTheme.colors.text }]}>
                  {formatDistance(selectedPlace.distance)}
                </Text>
              </View>
            </View>

            {/* Status */}
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🕒</Text>
              <View style={styles.detailContent}>
                <Text style={[styles.detailLabel, { color: currentTheme.colors.textSecondary }]}>
                  Status
                </Text>
                <Text style={[
                  styles.detailValue,
                  { color: selectedPlace.openNow ? currentTheme.colors.success : currentTheme.colors.danger }
                ]}>
                  {selectedPlace.openNow ? 'Open Now' : 'Closed'}
                </Text>
              </View>
            </View>
          </View>

          {/* Address */}
          {selectedPlace.address && (
            <View style={[styles.addressContainer, { borderTopColor: currentTheme.colors.border }]}>
              <Text style={styles.addressIcon}>📍</Text>
              <Text 
                style={[styles.addressText, { color: currentTheme.colors.textSecondary }]}
                numberOfLines={2}
              >
                {selectedPlace.address}
              </Text>
            </View>
          )}

          {/* Phone */}
          {selectedPlace.phone && (
            <View style={styles.phoneContainer}>
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={[styles.phoneText, { color: currentTheme.colors.primary }]}>
                {selectedPlace.phone}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: UI_CONSTANTS.SPACING.xl,
  },
  loadingText: {
    marginTop: UI_CONSTANTS.SPACING.md,
    fontSize: 16,
    fontWeight: '500',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: UI_CONSTANTS.SPACING.sm,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: UI_CONSTANTS.SPACING.md,
    right: UI_CONSTANTS.SPACING.md,
    borderRadius: UI_CONSTANTS.INPUT_BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  placeDetailsCard: {
    position: 'absolute',
    bottom: 20,
    left: UI_CONSTANTS.SPACING.md,
    right: UI_CONSTANTS.SPACING.md,
    borderRadius: UI_CONSTANTS.CARD_BORDER_RADIUS,
    padding: UI_CONSTANTS.SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: UI_CONSTANTS.SPACING.sm,
    right: UI_CONSTANTS.SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6c757d',
  },
  placeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  placeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: UI_CONSTANTS.SPACING.md,
  },
  placeIconLarge: {
    fontSize: 32,
  },
  placeMainInfo: {
    flex: 1,
    paddingRight: 40,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: UI_CONSTANTS.SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 20,
    marginRight: UI_CONSTANTS.SPACING.sm,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: UI_CONSTANTS.SPACING.md,
    borderTopWidth: 1,
    marginBottom: UI_CONSTANTS.SPACING.sm,
  },
  addressIcon: {
    fontSize: 16,
    marginRight: UI_CONSTANTS.SPACING.sm,
    marginTop: 2,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    fontSize: 16,
    marginRight: UI_CONSTANTS.SPACING.sm,
  },
  phoneText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MapScreen;