import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
/**
 * Instead of another api call we could use passing the props from the link
 *
 */

const Book = () => {
  return (
    <>
      <BookInfo />
    </>
  );
};

const BookInfo = () => {
  const router = useRouter();
  const { book } = router.query;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${book}`,
    fetcher
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading color={'red'}>Něco se pokazilo...</Heading>;
  }

  const bookData: GoogleBookApiBook = data;

  return <>{bookData.toString()}</>;
};

export default Book;
