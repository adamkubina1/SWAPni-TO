import { Seo } from '@/components/Seo';
import { Heading, Text, VStack } from '@chakra-ui/react';

const PAGE_TITLE = 'Osobní údaje';
const PAGE_DESCRIPTION = 'Ochrana osobních údajů na webové aplikace SWAPni TO';

const GDPR = () => {
  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Osobní údaje</Heading>
        <Text>Pracujeme na vytvoření této stránky...</Text>
      </VStack>
    </>
  );
};

export default GDPR;
