import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const CardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      w={'100%'}
      backgroundColor={'swap.lightBase'}
      p={1}
      boxShadow={'dark-lg'}
      borderRadius={'md'}
      color={'swap.lightText'}
    >
      {children}
    </Box>
  );
};

export { CardContainer };
