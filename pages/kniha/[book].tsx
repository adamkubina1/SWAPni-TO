import { AddBookOfferForm } from '@/components/forms/AddBookOfferForm';
import { CreateExchangeOfferForm } from '@/components/forms/CreateExchangeOfferForm';
import NoSSR from '@/components/NoSSR';
import { Rating } from '@/components/Ratings';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchAllOffersForBook } from '@/lib/customHooks/useFetchAllOffers';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookOffer } from '@/lib/types/BookOffer';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSigninCheck } from 'reactfire';
import useSWR from 'swr';

const PAGE_DESCRIPTION = 'Stránka o knize ve webové aplikace SWAPni TO.';

/**
 * Instead of another api call we could use passing the props from the link
 *
 */

const Book = () => {
  const router = useRouter();
  let { book } = router.query;
  if (Array.isArray(book)) {
    book = book[0];
  }

  if (!book) {
    return (
      <Text color={'red'} pt={28}>
        Něco se pokazilo...
      </Text>
    );
  }

  return (
    <>
      <VStack pt={28} gap={6}>
        <BookInfo bookId={book} />
        <BookActions bookId={book} />
        <BookRelatedContent bookId={book} />
      </VStack>
    </>
  );
};

const BookRelatedContent = ({ bookId }: { bookId: string }) => {
  const { data: signInCheckResult } = useSigninCheck();
  const { status, data: bookOffers } = useFetchAllOffersForBook({
    bookId,
  });

  if (!signInCheckResult?.signedIn) {
    return null;
  }
  if (status === 'loading') return <Spinner />;

  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <>
      {bookOffers.map((offer, i) => (
        <BookOfferCard
          key={i}
          userId={offer.userId}
          bookId={bookId}
          bookOfferId={offer.id}
          offer={{ bookState: offer.bookState, notes: offer.notes }}
          currentUID={signInCheckResult.user.uid}
        />
      ))}
    </>
  );
};

const BookOfferCard = ({
  userId,
  bookId,
  bookOfferId,
  offer,
  currentUID,
}: {
  userId: string;
  bookId: string;
  bookOfferId: string;
  offer: BookOffer;
  currentUID: string;
}) => {
  const { data: userFirestore, status } = useFetchProfile(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <Box>
      <Link href={`/uzivatel/${userId}`}>
        <UserAvatar userId={userId} size={'sm'} />
      </Link>
      <Heading>{userFirestore.userName}</Heading>
      {currentUID !== userId ? (
        <CreateExchangeOfferForm
          receiverUserId={userId}
          bookId={bookId}
          bookOfferId={bookOfferId}
          bookOffer={offer}
        />
      ) : null}
    </Box>
  );
};

const BookInfo = ({ bookId }: { bookId: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading color={'red'}>Něco se pokazilo...</Heading>;
  }
  const bookData: GoogleBookApiBook = data;
  console.log(bookData);

  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <>
      <Seo title={bookData.volumeInfo.title} description={PAGE_DESCRIPTION} />

      <Heading size={{ base: 'lg', md: '2xl' }} textAlign={'center'}>
        {bookData.volumeInfo.title}
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'start' }}
      >
        <VStack gap={2}>
          <Box
            pos={'relative'}
            w={{ base: 200, md: 200 }}
            h={{ base: 300, md: 300 }}
            minW={200}
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
          <Link
            href={`https://books.google.cz/books?id=${bookData.id}&hl=cs&sitesec=reviews`}
            target={'_blank'}
          >
            <HStack justify={'center'}>
              <Rating
                maxRating={5}
                rating={
                  bookData.volumeInfo?.averageRating
                    ? bookData.volumeInfo?.averageRating
                    : 0
                }
              />
              <Text fontSize={'xs'}>
                {bookData.volumeInfo.averageRating
                  ? bookData.volumeInfo.averageRating
                  : null}
                {' ('}
                {bookData.volumeInfo.ratingsCount
                  ? bookData.volumeInfo.ratingsCount
                  : '0'}
                {')'}
              </Text>
            </HStack>
          </Link>
        </VStack>
        <VStack align={'flex-start'}>
          <Text noOfLines={2} size={'x'}>
            {bookData.volumeInfo?.subtitle
              ? bookData.volumeInfo?.subtitle
              : null}
          </Text>
          <Heading size={'xs'} color={'swap.lightHighlight'}>
            {bookData.volumeInfo?.authors
              ? bookData.volumeInfo?.authors.join(', ')
              : null}
          </Heading>
          <Text>
            {bookData.volumeInfo?.description
              ? bookData.volumeInfo.description.replace(/(<([^>]+)>)/gi, '')
              : null}
          </Text>
          <Divider backgroundColor={'swap.darkHighlight'} />
          <Text fontSize={'xs'}>{bookData.volumeInfo.publishedDate}</Text>
          <Text fontSize={'xs'}>
            Počet stran: {bookData.volumeInfo.pageCount}
          </Text>
          <Text fontSize={'xs'}>Jazyk: {bookData.volumeInfo.language}</Text>
          <Text fontSize={'xs'}>
            Identifikátory:{' '}
            {bookData.volumeInfo?.industryIdentifiers
              ? bookData.volumeInfo?.industryIdentifiers.map((item, i) => (
                  <span key={i}>
                    {item.identifier}
                    {i !== bookData.volumeInfo?.industryIdentifiers.length - 1
                      ? ', '
                      : null}
                  </span>
                ))
              : null}
          </Text>
        </VStack>
      </Stack>
    </>
  );
};

const BookActions = ({ bookId }: { bookId: string }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <NoSSR>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 0 }}
        >
          {signInCheckResult.signedIn ? (
            <>
              <AddBookOfferForm bookId={bookId} />
              <Button>Přidat poptávku</Button>
              <Button>Napsat recenzi</Button>
            </>
          ) : (
            <Text color={'swap.darkHighlight'} fontSize={'xl'}>
              Přihlašte se pro přidání nabídek a poptávek na tuto knihu!
            </Text>
          )}
        </Stack>
      )}
    </NoSSR>
  );
};

export default Book;
