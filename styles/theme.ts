import { extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/open-sans';

const colors = {
  swap: {
    darkBase: '#22232F',
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
      baseStyle: {
        backgroundColor: '#22232F', //swap.darkBase
      },
    },
  },
  colors,
});

export { theme };
