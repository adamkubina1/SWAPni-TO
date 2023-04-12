import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Flex
      minH={'15vh'}
      justifyContent={'space-around'}
      align={'center'}
      wrap={'wrap'}
      direction={{ base: 'column-reverse', md: 'row' }}
      gap={10}
      pb={{ base: 2, md: 0 }}
      mt={'5vh'}
    >
      <VStack>
        <Text color={'gray.500'}>
          Vytvořil Adam Kubina © {new Date().getFullYear()}
        </Text>
        <HStack>
          <Text color={'gray.500'}>Zdrojový kód volně dostupný na</Text>
          <NextLink href={'https://github.com/adamkubina1/SWAPni-TO'}>
            <Box color={'gray.500'} _hover={{ color: 'swap.darkText' }}>
              <FaGithub size={20} />
            </Box>
          </NextLink>
        </HStack>
      </VStack>
      <VStack>
        <NextLink href={'/jak-to-funguje'}>
          <Text _hover={{ opacity: 0.8 }}>Jak to funguje?</Text>
        </NextLink>
        <NextLink href={'/osobni-udaje'}>
          <Text _hover={{ opacity: 0.8 }}>Osobní údaje</Text>
        </NextLink>
      </VStack>
    </Flex>
  );
};

export { Footer };
