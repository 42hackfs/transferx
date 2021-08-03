import { alpha, Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Input(theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFeatureSettings: "'ss06' on",
          letterSpacing: '-0.02em',
          '&input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active,input:-internal-autofill-selected':
            {
              backgroundColor: 'rgba(255, 255, 255, .10)',
              background: 'rgba(255, 255, 255, .10)',
              transition: 'background-color 5000s ease-in-out 0s'
            },
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled }
          }
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          border: '1px solid #e2e2e1',
          overflow: 'hidden',
          borderRadius: 20,
          backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
          transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
          '&:hover': {
            backgroundColor: 'transparent'
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.42)} 0 0 0 1px`,
            borderColor: theme.palette.primary.main
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground
          }
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },
    'MuiInputLabel-outlined': {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.common.white,
          background: 'rgba(255, 255, 255, .10)',
          backgroundColor: 'rgba(255, 255, 255, .10)',
          '&:hover': {
            borderColor: theme.palette.common.white
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.common.white
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground
            }
          }
        }
      }
    }
  };
}
