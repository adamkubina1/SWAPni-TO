import { CardContainer } from '@/components/CardContainer';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { useFetchAllDemandsForUser } from '@/lib/customHooks/useFetchAllDemands';
import { useFetchBook } from '@/lib/customHooks/useFetchBook';
import { deleteDemand } from '@/lib/deleteDemand';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookDemand } from '@/lib/types/BookDemand';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
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

  return (
    <VStack>
      {data.map((demand, i) => (
        <BookDemand key={i} demand={demand} />
      ))}
    </VStack>
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
    <CardContainer>
      <HStack>
        <Link href={`/kniha/${demand.bookId}`}>
          <Box
            pos={'relative'}
            w={120}
            h={180}
            minW={120}
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
        <VStack>
          <Heading size={'sm'}>{bookData.volumeInfo.title}</Heading>
          <Button
            size={'sm'}
            onClick={() => deleteDemand(firestore, demand.id)}
          >
            Smazat
          </Button>
        </VStack>
      </HStack>
    </CardContainer>
  );
};

export default Demands;
