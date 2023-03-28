import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

/**
 * @param Function To close if mobile navbar is open after the link is clicked
 */
const NavbarLogo = ({ setOpenFalse }: { setOpenFalse: () => void }) => {
  return (
    <NextLink href={'/'} passHref onClick={setOpenFalse}>
      <Box _hover={{ opacity: 0.8 }}>
        <Image
          src={'/imgs/logo-Placeholder.jpg'}
          width={'50'}
          height={'50'}
          alt={'SWAPni-to logo'}
        />
      </Box>
    </NextLink>
  );
};

export { NavbarLogo };
