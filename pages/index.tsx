import { Seo } from '@/components/Seo';
import { Heading, HStack } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Seo />
      <HStack pt={{ base: '10vh', md: '10vh' }} justifyContent={'center'}>
        <Heading size={{ base: 'xl', md: '2xl' }}>Prozkoumejte knihy</Heading>
      </HStack>
    </>
  );
};

export default Home;
