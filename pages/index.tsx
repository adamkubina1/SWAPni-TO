import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { Heading, VStack } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Seo />
      <VStack pt={{ base: '10vh', md: '10vh' }} justifyContent={'center'}>
        <Heading size={{ base: 'lg', md: '2xl' }}>
          Prozkoumejte SWAPni TO
        </Heading>
        <NoSSR>
          <SearchForm />
        </NoSSR>
      </VStack>
    </>
  );
};

export default Home;
