import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { useFetchAllDemandsForUser } from '@/lib/customHooks/useFetchAllDemands';
import { useFetchBook } from '@/lib/customHooks/useFetchBook';
import { deleteDemand } from '@/lib/deleteDemand';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookDemand } from '@/lib/types/BookDemand';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useFirestore, useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Moje poptávky';
const PAGE_DESCRIPTION =
  'Přehled uživatelových poptávek ve webové aplikaci SWAPni TO.';

const Demands = () => {
  const signIn = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Moje poptávky</Heading>
        <Text>
          <InfoIcon w={8} h={6} />
          Poptávky slouží jako hlídací pes pro knihu. Vždy když k vámi poptávané
          knize je přidána nová nabídka dostanete emailové upozornění.
        </Text>
        {signIn.data?.user?.uid ? (
          <BookDemandsList userId={signIn.data.user.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

const BookDemandsList = ({ userId }: { userId: string }) => {
  const { status, data } = useFetchAllDemandsForUser({ userId: userId });

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  if (data.length < 1)
    return (
      <Text>
        Žádné poptávky knih k nahlédnutí, přidejte je{' '}
        <Box as={'span'} color={'swap.lightHighlight'}>
          <Link href={'/'}>zde</Link>
        </Box>
        .
      </Text>
    );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {data.map((demand, i) => (
        <BookDemand key={i} demand={demand} />
      ))}
    </SimpleGrid>
  );
};

const BookDemand = ({ demand }: { demand: BookDemand & { id: string } }) => {
  const book = useFetchBook(demand.bookId);
  const firestore = useFirestore();

  if (book.isLoading) return <Spinner />;
  if (book.error) return <Text>Něco se pokazilo...</Text>;

  const bookData: GoogleBookApiBook = book.data;

  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <Box
      boxShadow={'xl'}
      color={'swap.darkText'}
      borderRadius={'md'}
      borderColor={'swap.lightBase'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      py={{ base: 4, md: 0 }}
      pr={{ base: 0, md: 4 }}
    >
      <Stack
        gap={{ base: 4, md: 1 }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
      >
        <VStack align={'center'} maxW={'105'}>
          <Link href={`/kniha/${demand.bookId}`}>
            <Box
              pos={'relative'}
              w={105}
              h={140}
              minW={90}
              objectFit={'cover'}
              overflow={'hidden'}
              mr={2}
              borderRadius={'md'}
            >
              <Image
                src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
                fill
                alt={bookData.volumeInfo.title}
              />
            </Box>
          </Link>
          <Heading size={'xs'}>{bookData.volumeInfo.title}</Heading>
        </VStack>

        <Button
          onClick={() => deleteDemand(firestore, demand.id)}
          colorScheme={'red'}
        >
          Smazat
        </Button>
      </Stack>
    </Box>
  );
};

export default Demands;
