import { UserAvatar } from '@/components/generic/UserAvatar';
import { Box, Flex, Heading, HStack, Spinner, Tooltip } from '@chakra-ui/react';
import { signOut } from '@firebase/auth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { MdMessage, MdOutlineLogout, MdSwapHoriz } from 'react-icons/md';
import { useAuth, useUser } from 'reactfire';
import { NavbarContainer } from './NavbarContainer';
import { NavbarHamburger } from './NavbarHamburger';
import { NavbarLinksContainer } from './NavbarLinksContainer';
import { NavbarLogo } from './NavbarLogo';

/**
 * Navbar
 * base -----Mobile version----- md ------Desktop version ----->
 *
 * On mobile using flex order to switch Components order
 * Flex grow/flex basis is used to center the links
 * Logout icon shows on destop in ButtonLinksAuth, but on mobile in LinksAuth
 * *****DESKTOP*****
 * LOGO ----- LINKS ------ BUTTONS
 * *****MOBILE******
 * LOGO ------ BUTTONS ------ BURGER
 */

const NavbarAuth = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!isOpen);
  const setOpenFalse = () => setOpen(false);

  return (
    <NavbarContainer>
      <Flex
        order={'-2'}
        flexGrow={{ base: 0, md: 1 }}
        flexBasis={{ base: 'auto', md: 0 }}
      >
        <NavbarLogo setOpenFalse={setOpenFalse} />
      </Flex>
      <NavbarHamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      <LinksAuth isOpen={isOpen} setOpenFalse={setOpenFalse} />
      <Flex
        order={{ base: -1, md: 1 }}
        flexGrow={{ base: 0, md: 1 }}
        flexBasis={{ base: 'auto', md: 0 }}
        justifyContent={'flex-end'}
      >
        <ButtonLinksAuth setOpenFalse={setOpenFalse} />
      </Flex>
    </NavbarContainer>
  );
};

const LinksAuth = ({
  isOpen,
  setOpenFalse,
}: {
  isOpen: boolean;
  setOpenFalse: () => void;
}) => {
  return (
    <NavbarLinksContainer isOpen={isOpen} authJustify={true}>
      <NextLink href={'/'} onClick={setOpenFalse}>
        <Heading
          size={{ base: 'md', md: 'sm' }}
          fontWeight={'normal'}
          _hover={{ opacity: 0.8 }}
        >
          SWAP
        </Heading>
      </NextLink>
      <NextLink href={'/nabidky'} onClick={setOpenFalse}>
        <Heading
          size={{ base: 'md', md: 'sm' }}
          fontWeight={'normal'}
          _hover={{ opacity: 0.8 }}
        >
          Nabídky
        </Heading>
      </NextLink>
      <NextLink href={'/poptavky'} onClick={setOpenFalse}>
        <Heading
          size={{ base: 'md', md: 'sm' }}
          fontWeight={'normal'}
          _hover={{ opacity: 0.8 }}
        >
          Poptávky
        </Heading>
      </NextLink>
      <Box display={{ base: 'block', md: 'none' }}>
        <LogOutIcon />
      </Box>
    </NavbarLinksContainer>
  );
};

const ButtonLinksAuth = ({ setOpenFalse }: { setOpenFalse: () => void }) => {
  const { data: user } = useUser();

  return (
    <HStack gap={{ base: 0, md: 8 }}>
      <HStack gap={1}>
        <Tooltip
          label={'Žádosti o výměnu'}
          aria-label={'Žádosti o výměnu tooltip'}
        >
          <NextLink href={'/zadosti-o-vymeny'} onClick={setOpenFalse}>
            <MdSwapHoriz size={40} />
          </NextLink>
        </Tooltip>
        <Tooltip label={'Chaty a zprávy'} aria-label={'Chaty a zprávy tooltip'}>
          <NextLink href={'/zpravy'} onClick={setOpenFalse}>
            <MdMessage size={35} />
          </NextLink>
        </Tooltip>
        <Tooltip label={'Můj profil'} aria-label={'Můj profil tooltip'}>
          <NextLink href={'/profil'} onClick={setOpenFalse}>
            {user?.uid ? (
              <UserAvatar userId={user.uid} size={'sm'} />
            ) : (
              <Spinner />
            )}
          </NextLink>
        </Tooltip>
      </HStack>
      <Box display={{ base: 'none', md: 'block' }}>
        <LogOutIcon />
      </Box>
    </HStack>
  );
};

const LogOutIcon = () => {
  const auth = useAuth();
  const router = useRouter();

  const onSignOutRequested = useCallback(() => {
    return signOut(auth).then(() => router.reload());
  }, [auth, router]);

  return (
    <Tooltip label={'Odhlásit se'} aria-label={'Odhlásit se tooltip'}>
      <NextLink href={'/'} onClick={onSignOutRequested}>
        <MdOutlineLogout size={35} />
      </NextLink>
    </Tooltip>
  );
};

export { NavbarAuth };
