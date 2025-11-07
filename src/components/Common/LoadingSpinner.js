import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { UI_CONSTANTS } from '../../utils/constants';

const LoadingSpinner = ({ 
  size = 'large', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const { currentTheme } = useSelector(state => state.theme);

  const containerStyle = fullScreen 
    ? styles.fullScreenContainer 
    : styles.inlineContainer;

  return (
    <View style={[
      containerStyle,
      { backgroundColor: fullScreen ? currentTheme.colors.background : 'transparent' }
    ]}>
      <ActivityIndicator 
        size={size} 
        color={currentTheme.colors.primary} 
      />
      {text && (
        <Text style={[
          styles.loadingText,
          { color: currentTheme.colors.text }
        ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: UI_CONSTANTS.SPACING.xl,
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: UI_CONSTANTS.SPACING.lg,
  },
  loadingText: {
    marginTop: UI_CONSTANTS.SPACING.md,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingSpinner;