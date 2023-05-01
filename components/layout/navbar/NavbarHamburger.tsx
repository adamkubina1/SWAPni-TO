import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const NavbarHamburger = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggleOpen} mr={'4'}>
      {isOpen ? <CloseIcon w={5} h={5} /> : <HamburgerIcon w={7} h={7} />}
    </Box>
  );
};

export { NavbarHamburger };
