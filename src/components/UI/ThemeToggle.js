import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { UI_CONSTANTS } from '../../utils/constants';

const ThemeToggle = ({ size = 'medium', showLabel = true }) => {
  const dispatch = useDispatch();
  const { isDarkMode, currentTheme } = useSelector(state => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { width: 50, height: 28 },
          circle: { width: 22, height: 22 },
          icon: { fontSize: 12 },
        };
      case 'large':
        return {
          container: { width: 70, height: 38 },
          circle: { width: 32, height: 32 },
          icon: { fontSize: 18 },
        };
      default: // medium
        return {
          container: { width: 60, height: 32 },
          circle: { width: 26, height: 26 },
          icon: { fontSize: 14 },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={styles.wrapper}>
      {showLabel && (
        <Text style={[styles.label, { color: currentTheme.colors.textSecondary }]}>
          {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          sizeStyles.container,
          {
            backgroundColor: isDarkMode 
              ? currentTheme.colors.primary 
              : currentTheme.colors.border,
          }
        ]}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.toggleCircle,
            sizeStyles.circle,
            {
              transform: [
                { translateX: isDarkMode ? sizeStyles.container.width - sizeStyles.circle.width - 4 : 2 }
              ],
              backgroundColor: currentTheme.colors.white,
            }
          ]}
        >
          <Text style={[styles.icon, sizeStyles.icon]}>
            {isDarkMode ? '🌙' : '☀️'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: UI_CONSTANTS.SPACING.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleContainer: {
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleCircle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    textAlign: 'center',
  },
});

export default ThemeToggle;