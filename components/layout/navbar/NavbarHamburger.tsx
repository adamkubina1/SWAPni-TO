import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

type NavbarHamburgerType = {
  isOpen: boolean;
  toggleOpen: () => void;
};

/**
 * @param isOpen State of navbar hamburger false is closed, true is open;
 * @param toggleOpen Function that changes state of isOpen to opposite of current state.
 */
const NavbarHamburger = ({ isOpen, toggleOpen }: NavbarHamburgerType) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggleOpen} mr={'4'}>
      {isOpen ? <CloseIcon w={6} h={6} /> : <HamburgerIcon w={8} h={8} />}
    </Box>
  );
};

export { NavbarHamburger };
