import { Rating } from '@/components/generic/Ratings';
import { Seo } from '@/components/generic/Seo';
import { useFetchBook } from '@/lib/customHooks/googleBooksHooks/useFetchBook';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Divider,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { BookActions } from './BookActions';

const PAGE_DESCRIPTION = 'Stránka o knize ve webové aplikace SWAPni TO.';

export const BookInfo = ({ bookId }: { bookId: string }) => {
  const { data, error, isLoading } = useFetchBook(bookId);

  if (isLoading) return <Spinner />;

  if (error) return <Heading color={'red'}>Něco se pokazilo...</Heading>;

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
