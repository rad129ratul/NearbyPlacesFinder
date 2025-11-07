import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '../../redux/slices/placesSlice';
import { CATEGORIES } from '../../utils/constants';

const CustomMarkers = ({ places }) => {
  const dispatch = useDispatch();
  const { selectedPlace } = useSelector(state => state.places);
  const { currentTheme } = useSelector(state => state.theme);

  const handleMarkerPress = (place) => {
    dispatch(setSelectedPlace(place));
  };

  const getCategoryIcon = (category) => {
    switch(category) {
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

  const getCategoryColor = (category) => {
    switch(category) {
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

  return (
    <>
      {places.map((place) => {
        const isSelected = selectedPlace?.id === place.id;
        
        return (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => handleMarkerPress(place)}
            tracksViewChanges={false}
          >
            <View style={[
              styles.markerContainer,
              { 
                borderColor: getCategoryColor(place.category),
                backgroundColor: isSelected ? getCategoryColor(place.category) : currentTheme.colors.white,
                transform: [{ scale: isSelected ? 1.2 : 1 }]
              }
            ]}>
              <Text style={styles.markerIcon}>
                {getCategoryIcon(place.category)}
              </Text>
              
              {/* Rating badge */}
              {place.rating && (
                <View style={[
                  styles.ratingBadge,
                  { backgroundColor: getCategoryColor(place.category) }
                ]}>
                  <Text style={styles.ratingText}>
                    ⭐ {place.rating.toFixed(1)}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Place name label when selected */}
            {isSelected && (
              <View style={[
                styles.nameLabel,
                { backgroundColor: currentTheme.colors.cardBackground }
              ]}>
                <Text style={[
                  styles.nameText,
                  { color: currentTheme.colors.text }
                ]} numberOfLines={1}>
                  {place.name}
                </Text>
              </View>
            )}
          </Marker>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 20,
  },
  ratingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  nameLabel: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    maxWidth: 120,
  },
  nameText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CustomMarkers;