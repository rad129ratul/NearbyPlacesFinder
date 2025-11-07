import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedPlace } from '../../redux/slices/placesSlice';
import { UI_CONSTANTS } from '../../utils/constants';

const SearchBar = ({ placeholder = 'Search nearby places...' }) => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(state => state.theme);
  const { allPlaces, searchQuery } = useSelector(state => state.places);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const suggestions = React.useMemo(() => {
    if (!localQuery.trim()) return [];
    
    const query = localQuery.toLowerCase();
    return allPlaces
      .filter(place => 
        place.name.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query)
      )
      .slice(0, 5); 
  }, [localQuery, allPlaces]);

  const handleSearch = (text) => {
    setLocalQuery(text);
    dispatch(setSearchQuery(text));
    setShowSuggestions(text.trim().length > 0);
  };

  const handleSuggestionPress = (place) => {
    setLocalQuery(place.name);
    dispatch(setSearchQuery(place.name));
    dispatch(setSelectedPlace(place));
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
        { 
          backgroundColor: currentTheme.colors.inputBackground,
          borderColor: currentTheme.colors.border
        }
      ]}>
        {/* Search icon */}
        <Text style={styles.searchIcon}>🔍</Text>

        {/* Search input */}
        <TextInput
          style={[
            styles.input,
            { color: currentTheme.colors.text }
          ]}
          placeholder={placeholder}
          placeholderTextColor={currentTheme.colors.textSecondary}
          value={localQuery}
          onChangeText={handleSearch}
          onFocus={() => setShowSuggestions(localQuery.trim().length > 0)}
          returnKeyType="search"
        />

        {/* Clear button */}
        {localQuery.length > 0 && (
          <TouchableOpacity 
            onPress={handleClear}
            style={styles.clearButton}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Auto-suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <View style={[
          styles.suggestionsContainer,
          { 
            backgroundColor: currentTheme.colors.cardBackground,
            borderColor: currentTheme.colors.border
          }
        ]}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.suggestionItem,
                  { borderBottomColor: currentTheme.colors.border }
                ]}
                onPress={() => handleSuggestionPress(item)}
              >
                <View style={styles.suggestionContent}>
                  <Text style={styles.suggestionIcon}>
                    {getCategoryIcon(item.category)}
                  </Text>
                  <View style={styles.suggestionTextContainer}>
                    <Text 
                      style={[
                        styles.suggestionName,
                        { color: currentTheme.colors.text }
                      ]}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text 
                      style={[
                        styles.suggestionCategory,
                        { color: currentTheme.colors.textSecondary }
                      ]}
                    >
                      {item.category} • {formatDistance(item.distance)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    food: '🍽️',
    shops: '🛍️',
    hospitals: '🏥',
    cafes: '☕',
    gas: '⛽',
  };
  return icons[category] || '🌍';
};

const formatDistance = (meters) => {
  if (!meters) return '';
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: UI_CONSTANTS.INPUT_HEIGHT,
    borderRadius: UI_CONSTANTS.INPUT_BORDER_RADIUS,
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIcon: {
    fontSize: 18,
    color: '#6c757d',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: UI_CONSTANTS.INPUT_HEIGHT + 8,
    left: 0,
    right: 0,
    maxHeight: 250,
    borderRadius: UI_CONSTANTS.INPUT_BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: UI_CONSTANTS.SPACING.md,
    borderBottomWidth: 1,
  },
  suggestionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  suggestionCategory: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
});

export default SearchBar;