import useSWR from 'swr';

const useFetchBook = (bookId: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );
};

export { useFetchBook };
