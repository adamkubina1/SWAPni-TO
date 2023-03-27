import { Box, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type NavbarLinksContainerType = {
  children: ReactNode;
  isOpen: boolean;
};

/**
 * @param children ReactNode
 * @param isOpen Boolean that describes the state of the the mobile hamburger.
 */
const NavbarLinksContainer = ({
  children,
  isOpen,
}: NavbarLinksContainerType) => {
  return (
    <Box
      h={{ base: isOpen ? '100vh' : 'auto', md: 'auto' }}
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={10}
        alignItems={'center'}
        alignContent={'center'}
        justifyContent={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[30, 30, 0, 0]}
        whiteSpace={'nowrap'}
      >
        {children}
      </Stack>
    </Box>
  );
};

export { NavbarLinksContainer };
