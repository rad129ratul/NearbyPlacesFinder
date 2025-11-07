import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { UI_CONSTANTS } from '../../utils/constants';
import ThemeToggle from '../UI/ThemeToggle';

const Header = ({ title = 'NearbyPlaces Finder', showThemeToggle = true }) => {
  const { currentTheme } = useSelector(state => state.theme);

  return (
    <View style={[
      styles.header,
      { 
        backgroundColor: currentTheme.colors.cardBackground,
        borderBottomColor: currentTheme.colors.border
      }
    ]}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.logo}>📍</Text>
          <Text style={[
            styles.title,
            { color: currentTheme.colors.text }
          ]}>
            {title}
          </Text>
        </View>

        {showThemeToggle && (
          <View style={styles.rightSection}>
            <ThemeToggle size="small" showLabel={false} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    paddingVertical: UI_CONSTANTS.SPACING.md,
    paddingTop: 50, 
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    fontSize: 28,
    marginRight: UI_CONSTANTS.SPACING.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  rightSection: {
    marginLeft: UI_CONSTANTS.SPACING.md,
  },
});

export default Header;