import { Button, Heading, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { NavbarContainer } from './NavbarContainer';
import { NavbarHamburger } from './NavbarHamburger';
import { NavbarLinksContainer } from './NavbarLinksContainer';
import { NavbarLogo } from './NavbarLogo';

/**
 * Navbar
 * base -----Mobile version----- md ------Desktop version ----->
 */

const NavbarNonAuth = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);

  return (
    <NavbarContainer>
      <NavbarLogo />
      <Spacer />
      <NavbarHamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      <LinksNonAuth isOpen={isOpen} />
    </NavbarContainer>
  );
};

const LinksNonAuth = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <NavbarLinksContainer isOpen={isOpen}>
      <NextLink href={'/jak-to-funguje'}>
        <Heading>Jak to funguje?</Heading>
      </NextLink>
      <NextLink href={'/prihlaseni'}>
        <Button>Přihlášení</Button>
      </NextLink>
      <NextLink href={'/registrace'}>
        <Button>Registrace</Button>
      </NextLink>
    </NavbarLinksContainer>
  );
};

export { NavbarNonAuth };
