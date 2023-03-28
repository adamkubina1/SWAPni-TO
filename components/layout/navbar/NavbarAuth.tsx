import { Box, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { NavbarContainer } from './NavbarContainer';
import { NavbarHamburger } from './NavbarHamburger';
import { NavbarLinksContainer } from './NavbarLinksContainer';
import { NavbarLogo } from './NavbarLogo';

/**
 * Navbar
 * base -----Mobile version----- md ------Desktop version ----->
 *
 * On mobile using flex order to switch Components order
 * *****DESKTOP*****
 * LOGO ----- LINKS ------ BUTTONS
 * *****MOBILE******
 * LOGO ------ BUTTONS ------ BURGER
 */

const NavbarAuth = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);

  return (
    <NavbarContainer>
      <Box display={'flex'} order={'-2'}>
        <NavbarLogo />
      </Box>
      <NavbarHamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      <LinksAuth isOpen={isOpen} />
      <ButtonLinksAuth />
    </NavbarContainer>
  );
};

const LinksAuth = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <NavbarLinksContainer isOpen={isOpen}>
      <NextLink href={'/'}>
        <Heading size={'md'}>Knihy</Heading>
      </NextLink>
      <NextLink href={'/nabidky'}>
        <Heading size={'md'}>Nabídky</Heading>
      </NextLink>
      <NextLink href={'/poptávky'}>
        <Heading size={'md'}>Poptávky</Heading>
      </NextLink>
    </NavbarLinksContainer>
  );
};

const ButtonLinksAuth = () => {
  return (
    <Box display={'flex'} order={{ base: -1, md: 1 }}>
      Buttons tmp
    </Box>
  );
};

export { NavbarAuth };
