export const theme = {
  colors: {
    background: "#282c34",
    primary: '#3700B3',
    
    primaryDark: '#3700B3',
    primaryRgb: '98,0,238',

    secondary: '#03DAC6',

    white: '#FFFFFF',
    black: '#000000',

    gray100: '#F5F5F5',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray600: '#757575',
    gray800: '#424242',

    text: '#424242',
    textSecondary: '#757575',

    danger: '#B00020',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Arial, sans-serif',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  }

} as const;

export type ThemeType = typeof theme;