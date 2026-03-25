import { createTheme } from '@mui/material/styles'

const gold = '#C6A55C'
const goldLight = '#D4AF37'
const goldDark = '#A8893D'
const darkBg = '#0D0D0D'
const darkPaper = '#161616'
const darkCard = '#1A1A1A'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: gold,
      light: goldLight,
      dark: goldDark,
      contrastText: '#0D0D0D',
    },
    secondary: {
      main: goldLight,
      light: '#E8C547',
      dark: goldDark,
      contrastText: '#0D0D0D',
    },
    background: {
      default: darkBg,
      paper: darkPaper,
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#8A8A8A',
    },
    divider: 'rgba(198,165,92,0.12)',
    success: { main: '#4ADE80' },
    error: { main: '#F87171' },
    warning: { main: goldLight },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '1px' },
    h2: { fontWeight: 700, letterSpacing: '0.5px' },
    h3: { fontWeight: 700, letterSpacing: '0.5px' },
    h4: { fontWeight: 700, letterSpacing: '0.3px' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    overline: { fontWeight: 700, letterSpacing: '3px' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.5px' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkBg,
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: '#333', borderRadius: '10px' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '11px 28px',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
          color: '#0D0D0D',
          fontWeight: 700,
          '&:hover': {
            background: `linear-gradient(135deg, ${goldLight}, ${gold})`,
            boxShadow: `0 8px 30px rgba(198,165,92,0.3)`,
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
          color: '#0D0D0D',
          fontWeight: 700,
          '&:hover': {
            background: `linear-gradient(135deg, ${goldLight}, ${gold})`,
            boxShadow: `0 8px 30px rgba(198,165,92,0.3)`,
            transform: 'translateY(-2px)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(198,165,92,0.3)',
          color: gold,
          '&:hover': {
            borderColor: gold,
            background: 'rgba(198,165,92,0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkCard,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            borderColor: 'rgba(198,165,92,0.25)',
            boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(198,165,92,0.08)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13,13,13,0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(198,165,92,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: gold,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: gold,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.72rem',
          letterSpacing: '0.5px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
          color: '#0D0D0D',
          fontWeight: 600,
        },
        filledInfo: {
          background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
          color: '#0D0D0D',
          fontWeight: 600,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: gold,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: `linear-gradient(135deg, ${gold}, ${goldLight})`,
          color: '#0D0D0D',
          fontWeight: 700,
        },
      },
    },
  },
})

export default theme
