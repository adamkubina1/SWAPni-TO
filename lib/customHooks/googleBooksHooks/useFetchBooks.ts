import useSWR from 'swr';

/**
 * Requests a search in Google Books based on search term -> title/author/ISBN
 * @param search
 * @returns SWRResponse<any, any, any>
 */
const useFetchBooks = (search: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&projection=full&maxResults=40`,
    fetcher
  );
};

export { useFetchBooks };
