import { Button, Heading, Spacer, Stack } from '@chakra-ui/react';
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
  const setOpenFalse = () => setOpen(false);

  return (
    <NavbarContainer>
      <NavbarLogo setOpenFalse={setOpenFalse} />
      <Spacer />
      <NavbarHamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      <LinksNonAuth isOpen={isOpen} setOpenFalse={setOpenFalse} />
    </NavbarContainer>
  );
};

const LinksNonAuth = ({
  isOpen,
  setOpenFalse,
}: {
  isOpen: boolean;
  setOpenFalse: () => void;
}) => {
  return (
    <NavbarLinksContainer isOpen={isOpen} authJustify={false}>
      <NextLink href={'/jak-to-funguje'} onClick={setOpenFalse}>
        <Heading size={{ base: 'md', md: 'sm' }} fontWeight={'normal'}>
          Jak to funguje?
        </Heading>
      </NextLink>
      <Stack direction={{ base: 'column', md: 'row' }} align={'center'}>
        <NextLink href={'/prihlaseni'} onClick={setOpenFalse}>
          <Button
            variant={'swapDarkOutline'}
            size={{ base: 'md', md: 'sm' }}
            fontWeight={'normal'}
          >
            Přihlášení
          </Button>
        </NextLink>
        <NextLink href={'/registrace'} onClick={setOpenFalse}>
          <Button
            variant={'swapDarkOutline'}
            size={{ base: 'md', md: 'sm' }}
            fontWeight={'normal'}
          >
            Registrace
          </Button>
        </NextLink>
      </Stack>
    </NavbarLinksContainer>
  );
};

export { NavbarNonAuth };
