import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as={'nav'}
      w={'100%'}
      display={'flex'}
      position={'fixed'}
      zIndex={'overlay'}
      alignItems={'center'}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      px={{ base: 4, md: 6 }}
      bgColor={'gray.100'}
    >
      {children}
    </Box>
  );
};

export { NavbarContainer };
