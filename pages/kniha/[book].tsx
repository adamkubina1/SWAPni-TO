import { AddBookOfferForm } from '@/components/forms/AddBookOfferForm';
import NoSSR from '@/components/generic/NoSSR';
import { OfferCard } from '@/components/generic/OfferCard';
import { Rating } from '@/components/generic/Ratings';
import { Seo } from '@/components/generic/Seo';
import { createBookDemand } from '@/lib/cloudFunctionsCalls/createBookDemand';
import { useFetchAllOffersForBook } from '@/lib/customHooks/useFetchAllOffers';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Divider,
  Heading,
  Spinner,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFunctions, useSigninCheck } from 'reactfire';
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
    <VStack w={'full'}>
      {bookOffers.map((offer, i) => (
        <OfferCard key={i} offer={offer} userUID={signInCheckResult.user.uid} />
      ))}
    </VStack>
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
            <VStack justify={'center'} align={'center'}>
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
            </VStack>
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
      <BookActions bookId={bookData.id} bookTitle={bookData.volumeInfo.title} />
    </>
  );
};

const BookActions = ({
  bookId,
  bookTitle,
}: {
  bookId: string;
  bookTitle: string;
}) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const functions = useFunctions();
  const toast = useToast();

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
              <AddBookOfferForm bookId={bookId} bookTitle={bookTitle} />
              <Button
                size={'sm'}
                variant={'swapDarkOutline'}
                onClick={() =>
                  createBookDemand(functions, bookId, bookTitle)
                    .then(() => {
                      toast({
                        title: 'Poptávka vytvořena.',
                        description:
                          'Při přidání nových nabídek k této knize budete nyní dostávat emailová upozornění.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(() => {
                      toast({
                        title: 'Tuto knihu již poptáváte.',
                        description: 'Duplikovaná poptávka.',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                }
              >
                Přidat poptávku
              </Button>
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
