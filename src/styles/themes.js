import { StyleSheet } from 'react-native';
import { COLORS, UI_CONSTANTS } from '../utils/constants';

// Light theme styles based on Bootstrap 5
export const lightTheme = {
  colors: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    success: COLORS.success,
    danger: COLORS.danger,
    warning: COLORS.warning,
    info: COLORS.info,
    background: COLORS.light.background,
    surface: COLORS.light.surface,
    text: COLORS.light.text,
    textSecondary: COLORS.light.textSecondary,
    border: COLORS.light.border,
    cardBackground: COLORS.light.cardBackground,
    inputBackground: COLORS.light.inputBackground,
    white: '#ffffff',
    black: '#000000'
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: COLORS.light.text,
      marginBottom: 16
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      color: COLORS.light.text,
      marginBottom: 12
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: COLORS.light.text,
      marginBottom: 10
    },
    h4: {
      fontSize: 20,
      fontWeight: '500',
      color: COLORS.light.text,
      marginBottom: 8
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.light.text,
      lineHeight: 24
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      color: COLORS.light.textSecondary,
      lineHeight: 20
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      color: COLORS.light.textSecondary,
      lineHeight: 16
    }
  },
  
  common: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.light.background
    },
    card: {
      backgroundColor: COLORS.light.cardBackground,
      borderRadius: UI_CONSTANTS.CARD_BORDER_RADIUS,
      padding: UI_CONSTANTS.SCREEN_PADDING,
      marginBottom: UI_CONSTANTS.SPACING.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: UI_CONSTANTS.CARD_SHADOW_ELEVATION,
      borderWidth: 1,
      borderColor: COLORS.light.border
    },
    button: {
      backgroundColor: COLORS.primary,
      height: UI_CONSTANTS.BUTTON_HEIGHT,
      borderRadius: UI_CONSTANTS.BUTTON_BORDER_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: UI_CONSTANTS.SPACING.lg
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600'
    },
    input: {
      backgroundColor: COLORS.light.inputBackground,
      height: UI_CONSTANTS.INPUT_HEIGHT,
      borderRadius: UI_CONSTANTS.INPUT_BORDER_RADIUS,
      paddingHorizontal: UI_CONSTANTS.SPACING.md,
      fontSize: 16,
      color: COLORS.light.text,
      borderWidth: 1,
      borderColor: COLORS.light.border
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.light.border,
      marginVertical: UI_CONSTANTS.SPACING.md
    }
  })
};

// Dark theme styles based on Bootstrap 5
export const darkTheme = {
  colors: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    success: COLORS.success,
    danger: COLORS.danger,
    warning: COLORS.warning,
    info: COLORS.info,
    background: COLORS.dark.background,
    surface: COLORS.dark.surface,
    text: COLORS.dark.text,
    textSecondary: COLORS.dark.textSecondary,
    border: COLORS.dark.border,
    cardBackground: COLORS.dark.cardBackground,
    inputBackground: COLORS.dark.inputBackground,
    white: '#ffffff',
    black: '#000000'
  },
  
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: COLORS.dark.text,
      marginBottom: 16
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      color: COLORS.dark.text,
      marginBottom: 12
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: COLORS.dark.text,
      marginBottom: 10
    },
    h4: {
      fontSize: 20,
      fontWeight: '500',
      color: COLORS.dark.text,
      marginBottom: 8
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.dark.text,
      lineHeight: 24
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      color: COLORS.dark.textSecondary,
      lineHeight: 20
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      color: COLORS.dark.textSecondary,
      lineHeight: 16
    }
  },
  
  common: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.dark.background
    },
    card: {
      backgroundColor: COLORS.dark.cardBackground,
      borderRadius: UI_CONSTANTS.CARD_BORDER_RADIUS,
      padding: UI_CONSTANTS.SCREEN_PADDING,
      marginBottom: UI_CONSTANTS.SPACING.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: UI_CONSTANTS.CARD_SHADOW_ELEVATION,
      borderWidth: 1,
      borderColor: COLORS.dark.border
    },
    button: {
      backgroundColor: COLORS.primary,
      height: UI_CONSTANTS.BUTTON_HEIGHT,
      borderRadius: UI_CONSTANTS.BUTTON_BORDER_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: UI_CONSTANTS.SPACING.lg
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600'
    },
    input: {
      backgroundColor: COLORS.dark.inputBackground,
      height: UI_CONSTANTS.INPUT_HEIGHT,
      borderRadius: UI_CONSTANTS.INPUT_BORDER_RADIUS,
      paddingHorizontal: UI_CONSTANTS.SPACING.md,
      fontSize: 16,
      color: COLORS.dark.text,
      borderWidth: 1,
      borderColor: COLORS.dark.border
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.dark.border,
      marginVertical: UI_CONSTANTS.SPACING.md
    }
  })
};

export const getTheme = (isDarkMode) => {
  return isDarkMode ? darkTheme : lightTheme;
};

export default {
  lightTheme,
  darkTheme,
  getTheme
};