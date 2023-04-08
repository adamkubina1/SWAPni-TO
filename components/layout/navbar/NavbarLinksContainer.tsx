import { Box, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

/**
 * @param children ReactNode
 * @param isOpen Boolean that describes the state of the the mobile hamburger.
 * @param authJustify Boolean for justifying links correctly based on the type of navbar. True for authentificated, false for nonauthentificated.
 */
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
