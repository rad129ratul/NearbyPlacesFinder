import { useCallback, useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Common/Header';
import MapDisplay from '../components/Map/MapDisplay';
import FilterButtons from '../components/UI/FilterButtons';
import PlaceCard from '../components/UI/PlaceCard';
import SearchBar from '../components/UI/SearchBar';
import {
    getCurrentLocation,
    requestLocationPermission,
    setCurrentLocation,
} from '../redux/slices/locationSlice';
import { fetchNearbyPlaces } from '../redux/slices/placesSlice';
import { ERROR_MESSAGES, UI_CONSTANTS } from '../utils/constants';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { currentLocation, loading: locationLoading, error: locationError } = useSelector(
    state => state.location
  );
  const { filteredPlaces, loading: placesLoading, selectedCategory } = useSelector(
    state => state.places
  );
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

  const handleRefresh = useCallback(() => {
    initializeLocation();
  }, []);

  // Loading state
  if (locationLoading) {
    return (
      <View style={[styles.fullContainer, { backgroundColor: currentTheme.colors.background }]}>
        <Header />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
          <Text style={[styles.loadingText, { color: currentTheme.colors.text }]}>
            Getting your location...
          </Text>
        </View>
      </View>
    );
  }

  // Error state
  if (locationError) {
    return (
      <View style={[styles.fullContainer, { backgroundColor: currentTheme.colors.background }]}>
        <Header />
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>📍</Text>
          <Text style={[styles.errorTitle, { color: currentTheme.colors.text }]}>
            Location Access Required
          </Text>
          <Text style={[styles.errorMessage, { color: currentTheme.colors.textSecondary }]}>
            {ERROR_MESSAGES.LOCATION_PERMISSION_DENIED}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      {/* Header */}
      <Header title="Nearby Places" />

      {/* Map Section - 35% of screen */}
      <View style={styles.mapContainer}>
        <MapDisplay />
      </View>

      {/* Content Section - 65% of screen */}
      <View style={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar placeholder="Search restaurants, shops, hospitals..." />
        </View>

        {/* Category Filters */}
        <FilterButtons />

        {/* Places List Header */}
        <View style={styles.listHeader}>
          <Text style={[styles.listTitle, { color: currentTheme.colors.text }]}>
            Nearby Places
          </Text>
          <Text style={[styles.placeCount, { color: currentTheme.colors.textSecondary }]}>
            {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'}
          </Text>
        </View>

        {/* Places List */}
        {placesLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={currentTheme.colors.primary} />
            <Text style={[styles.loadingText, { color: currentTheme.colors.textSecondary }]}>
              Loading places...
            </Text>
          </View>
        ) : filteredPlaces.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={[styles.emptyText, { color: currentTheme.colors.text }]}>
              No places found
            </Text>
            <Text style={[styles.emptySubtext, { color: currentTheme.colors.textSecondary }]}>
              Try adjusting your filters or search
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredPlaces}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceCard place={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={locationLoading}
                onRefresh={handleRefresh}
                tintColor={currentTheme.colors.primary}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mapContainer: {
    height: '35%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: UI_CONSTANTS.SPACING.md,
  },
  searchSection: {
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    marginBottom: UI_CONSTANTS.SPACING.sm,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    paddingVertical: UI_CONSTANTS.SPACING.sm,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  placeCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: UI_CONSTANTS.SPACING.xl,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: UI_CONSTANTS.SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: UI_CONSTANTS.SPACING.xl,
  },
  loadingText: {
    marginTop: UI_CONSTANTS.SPACING.md,
    fontSize: 15,
    fontWeight: '500',
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: UI_CONSTANTS.SPACING.sm,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: UI_CONSTANTS.SPACING.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: UI_CONSTANTS.SPACING.md,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: UI_CONSTANTS.SPACING.xs,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;