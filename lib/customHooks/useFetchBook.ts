import useSWR from 'swr';

/**
 * Fetches book data from Google Books API for a single book
 * @param bookId
 * @returns SWRResponse<any, any, any>
 */
const useFetchBook = (bookId: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );
};

export { useFetchBook };
