import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '../../redux/slices/placesSlice';
import { UI_CONSTANTS } from '../../utils/constants';
import {
    formatDistance,
    formatRating,
    getCategoryColor,
    getCategoryName,
    getOpenStatus,
    getOpenStatusColor,
    getPlaceIcon,
} from '../../utils/helpers';

const PlaceCard = ({ place }) => {
  const dispatch = useDispatch();
  const { selectedPlace } = useSelector(state => state.places);
  const { currentTheme } = useSelector(state => state.theme);

  const isSelected = selectedPlace?.id === place.id;

  const handlePress = () => {
    dispatch(setSelectedPlace(place));
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.colors.cardBackground,
          borderColor: isSelected 
            ? getCategoryColor(place.category) 
            : currentTheme.colors.border,
          borderWidth: isSelected ? 2 : 1,
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Top section: Icon and main info */}
      <View style={styles.topSection}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getCategoryColor(place.category) + '20' }
        ]}>
          <Text style={styles.placeIcon}>
            {getPlaceIcon(place.category)}
          </Text>
        </View>

        <View style={styles.mainInfo}>
          <Text 
            style={[
              styles.placeName,
              { color: currentTheme.colors.text }
            ]}
            numberOfLines={1}
          >
            {place.name}
          </Text>
          
          <Text 
            style={[
              styles.category,
              { color: currentTheme.colors.textSecondary }
            ]}
          >
            {getCategoryName(place.category)}
          </Text>
        </View>

        {/* Rating badge */}
        <View style={[
          styles.ratingBadge,
          { backgroundColor: currentTheme.colors.warning }
        ]}>
          <Text style={styles.ratingText}>
            ⭐ {formatRating(place.rating)}
          </Text>
        </View>
      </View>

      {/* Bottom section: Distance and status */}
      <View style={styles.bottomSection}>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceIcon}>📍</Text>
          <Text 
            style={[
              styles.distanceText,
              { color: currentTheme.colors.text }
            ]}
          >
            {formatDistance(place.distance)}
          </Text>
        </View>

        <View style={[
          styles.statusBadge,
          { backgroundColor: getOpenStatusColor(place.openNow) + '20' }
        ]}>
          <Text 
            style={[
              styles.statusText,
              { color: getOpenStatusColor(place.openNow) }
            ]}
          >
            {getOpenStatus(place.openNow)}
          </Text>
        </View>
      </View>

      {/* Address */}
      {place.address && (
        <Text 
          style={[
            styles.address,
            { color: currentTheme.colors.textSecondary }
          ]}
          numberOfLines={1}
        >
          📍 {place.address}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: UI_CONSTANTS.CARD_BORDER_RADIUS,
    padding: UI_CONSTANTS.SPACING.md,
    marginHorizontal: UI_CONSTANTS.SPACING.md,
    marginVertical: UI_CONSTANTS.SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: UI_CONSTANTS.SPACING.sm,
  },
  placeIcon: {
    fontSize: 24,
  },
  mainInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.xs,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  address: {
    fontSize: 12,
    marginTop: UI_CONSTANTS.SPACING.xs,
  },
});

export default PlaceCard;