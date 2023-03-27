import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

const NavbarLogo = () => {
  return (
    <NextLink href={'/'} passHref>
      <Box _hover={{ opacity: 0.8 }}>
        <Image
          src={'/imgs/logo_transparent.png'}
          width={'50'}
          height={'35'}
          alt={'SWAPni-to logo'}
        />
      </Box>
    </NextLink>
  );
};

export { NavbarLogo };
