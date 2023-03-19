import { extendTheme } from '@chakra-ui/react';

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

const theme = extendTheme({ colors });

export { theme };
