import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/placesSlice';
import { CATEGORIES, UI_CONSTANTS } from '../../utils/constants';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector(state => state.places);
  const { currentTheme } = useSelector(state => state.theme);

  const categories = [
    CATEGORIES.ALL,
    CATEGORIES.FOOD,
    CATEGORIES.CAFES,
    CATEGORIES.SHOPS,
    CATEGORIES.HOSPITALS,
    CATEGORIES.GAS_STATIONS,
  ];

  const handleCategoryPress = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterButton,
                {
                  backgroundColor: isActive 
                    ? category.color 
                    : currentTheme.colors.surface,
                  borderColor: isActive 
                    ? category.color 
                    : currentTheme.colors.border,
                }
              ]}
              onPress={() => handleCategoryPress(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: isActive 
                      ? '#ffffff' 
                      : currentTheme.colors.text,
                    fontWeight: isActive ? '600' : '500',
                  }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: UI_CONSTANTS.SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    gap: UI_CONSTANTS.SPACING.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    paddingVertical: UI_CONSTANTS.SPACING.sm + 2,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default FilterButtons;