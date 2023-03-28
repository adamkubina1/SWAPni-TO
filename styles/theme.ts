import { extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/open-sans';

const colors = {
  swap: {
    darkBase: '#22232F',
    darkBase95: 'rgba(34, 35, 47, 0.95)',
    darkText: '#FFFFFF',
    darkHighlight: '#E02401',
    lightBase: '#F5F5F5',
    lightText: '#030201',
    lightHighlight: '#189AD3',
  },
};

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        swapDark: {
          borderColor: 'swap.darkHighlight',
          borderWidth: '1px',
          fontWeight: 'normal',
          _hover: {
            background: 'swap.darkHighlight',
          },
        },
      },
    },
  },
  colors,
});

export { theme };
