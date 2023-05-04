import { Box, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

const NavbarLinksContainer = ({
  children,
  isOpen,
  authJustify,
}: {
  children: ReactNode;
  isOpen: boolean;
  authJustify: boolean;
}) => {
  return (
    <Box
      h={{ base: isOpen ? '100vh' : 'auto', md: 'auto' }}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: '0' }}
      flexGrow={{ base: 0, md: 1 }}
    >
      <Stack
        spacing={8}
        alignItems={'center'}
        alignContent={'center'}
        justifyContent={{
          base: 'center',
          md: authJustify ? 'center' : 'flex-end',
        }}
        direction={{ base: 'column', md: 'row' }}
        pt={{ base: 30, md: 0 }}
        whiteSpace={'nowrap'}
      >
        {children}
      </Stack>
    </Box>
  );
};

export { NavbarLinksContainer };
