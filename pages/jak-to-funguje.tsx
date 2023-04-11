import { Seo } from '@/components/Seo';
import { Heading, Text, VStack } from '@chakra-ui/react';

const PAGE_TITLE = 'Jak to funguje?';
const PAGE_DESCRIPTION = 'Popis fungování webové aplikace SWAPni TO';

const HowItWorks = () => {
  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Jak to funguje?</Heading>
        <Text>Pracujeme na vytvoření této stránky...</Text>
      </VStack>
    </>
  );
};

export default HowItWorks;
