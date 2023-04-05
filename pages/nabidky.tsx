import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { deleteBookOffer } from '@/lib/deleteBookOffer';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Box, Button, Heading, HStack, Spinner, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useFirestore, useSigninCheck } from 'reactfire';
import useSWR from 'swr';

const PAGE_TITLE = 'Moje nabídky';
const PAGE_DESCRIPTION =
  'Správa uživatelových nabídek knih do webové aplikace SWAPni TO.';

const Nabidky = () => {
  const signIn = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>
          Moje nabídky knih
        </Heading>
        {signIn.data?.user?.uid ? < BookOffersSection userId={signIn.data.user?.uid}/> : <Spinner/>}
        
      </VStack>
    </ProtectedPage>
  );
};

const BookOffersSection = ({userId}: {userId: string}) => {
  const { status, data: offers } = useFetchAllOffersForUser({ userId });

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      {offers.map((offer, i) => (
        <BookOfferCard key={i} bookId={offer.bookId} offer={offer} />
      ))}
    </>
  );
}

/**
 * TODO add types
 */
const BookOfferCard = ({ bookId, offer }: { bookId: string, offer: any }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );
    const firestore = useFirestore()

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading color={'red'}>Něco se pokazilo...</Heading>;
  }

  const bookData: GoogleBookApiBook = data;

  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <HStack>
    <Box
      pos={'relative'}
      w={{ base: 150, md: 150 }}
      h={{ base: 200, md: 200 }}
      minW={150}
      objectFit={'cover'}
      overflow={'hidden'}
      mr={2}
      borderRadius={'md'}
    >
      <Link href={`/kniha/${bookId}`}>
        <Image
        
        src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
          fill
          alt={bookData.volumeInfo?.title}
          />
      </Link>
      
    </Box>
        <Button onClick={() => deleteBookOffer(firestore, offer.id)}>Smazat</Button>
    </HStack>
  );
};

export default Nabidky;
