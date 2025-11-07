import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker, Polyline } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { calculateDistance } from '../../services/locationService';

const RoutePolyline = ({ origin, destination }) => {
  const { currentTheme } = useSelector(state => state.theme);

  const distance = useMemo(() => {
    if (!origin || !destination) return null;
    
    const distanceInMeters = calculateDistance(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    );
    
    return distanceInMeters;
  }, [origin, destination]);

  const formattedDistance = useMemo(() => {
    if (!distance) return '';
    
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    } else {
      return `${(distance / 1000).toFixed(2)} km`;
    }
  }, [distance]);

  const midpoint = useMemo(() => {
    if (!origin || !destination) return null;
    
    return {
      latitude: (origin.latitude + destination.latitude) / 2,
      longitude: (origin.longitude + destination.longitude) / 2,
    };
  }, [origin, destination]);

  const routeCoordinates = useMemo(() => {
    if (!origin || !destination) return [];
    
    return [
      {
        latitude: origin.latitude,
        longitude: origin.longitude,
      },
      {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    ];
  }, [origin, destination]);

  if (!origin || !destination) return null;

  return (
    <>
      {/* Route polyline */}
      <Polyline
        coordinates={routeCoordinates}
        strokeColor="#0d6efd"
        strokeWidth={4}
        lineDashPattern={[0]}
        lineJoin="round"
        lineCap="round"
      />

      {/* Dashed border effect */}
      <Polyline
        coordinates={routeCoordinates}
        strokeColor={currentTheme.colors.white}
        strokeWidth={2}
        lineDashPattern={[10, 5]}
        lineJoin="round"
        lineCap="round"
      />

      {/* Distance label at midpoint */}
      {midpoint && formattedDistance && (
        <Marker
          coordinate={midpoint}
          anchor={{ x: 0.5, y: 0.5 }}
          tracksViewChanges={false}
        >
          <View style={[
            styles.distanceLabel,
            { backgroundColor: currentTheme.colors.primary }
          ]}>
            <Text style={styles.distanceText}>
              📍 {formattedDistance}
            </Text>
          </View>
        </Marker>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  distanceLabel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  distanceText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default RoutePolyline;