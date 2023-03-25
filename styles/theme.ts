import { extendTheme } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/open-sans';

const colors = {
  swap: {
    green: '#00887A',
    pink: '#FFCCBC',
    lightBlue: '#D3E3FC',
    blue: '#77A6f7',
    black: '#030201',
    white: '#FFFFFF',
  },
};

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  colors,
});

export { theme };
