import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as={'nav'}
      w={'100%'}
      position={'fixed'}
      zIndex={'overlay'}
      display={'flex'}
      alignItems={'center'}
      px={{ base: 4, md: 6 }}
    >
      {children}
    </Box>
  );
};

export { NavbarContainer };
