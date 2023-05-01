import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

const NavbarLogo = ({ setOpenFalse }: { setOpenFalse: () => void }) => {
  return (
    <NextLink href={'/'} passHref onClick={setOpenFalse}>
      <Box
        _hover={{ opacity: 0.8 }}
        w={{ base: 12, md: 16 }}
        h={{ base: 12, md: 16 }}
        position={'relative'}
      >
        <Image src={'/imgs/swap-logo.svg'} fill alt={'SWAPni-to logo'} />
      </Box>
    </NextLink>
  );
};

export { NavbarLogo };
