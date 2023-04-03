import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
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

  return (
    <>
      <VStack pt={28} gap={6}>
        <BookInfo bookId={book} />
        <BookActions />
      </VStack>
    </>
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

      <Heading size={{ base: 'lg', md: '2xl' }}>
        {bookData.volumeInfo.title}
      </Heading>
      <Stack direction={{ base: 'column', md: 'row' }}>
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
        <VStack align={'flex-start'}>
          <Text noOfLines={2} size={'x'}>
            {bookData.volumeInfo?.subtitle
              ? bookData.volumeInfo?.subtitle
              : null}
          </Text>
          <Heading size={'xs'}>
            {bookData.volumeInfo?.authors
              ? bookData.volumeInfo?.authors.join(', ')
              : null}
          </Heading>
          <Text>
            {bookData.volumeInfo?.description
              ? bookData.volumeInfo.description.replace(/(<([^>]+)>)/gi, '')
              : null}
          </Text>
        </VStack>
      </Stack>
    </>
  );
};

const BookActions = () => {
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
              <Button>Přidat nabídku</Button>
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
