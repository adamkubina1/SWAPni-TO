import { BookCard } from '@/components/generic/BookCard';
import { useFetchBooks } from '@/lib/customHooks/googleBooksHooks/useFetchBooks';
import { GoogleBookApiResponseType } from '@/lib/types/GoogleBooksApiType';
import { SearchType } from '@/lib/types/SearchType';
import { Spinner, Text, VStack } from '@chakra-ui/react';

const SearchResult = ({
  search,
  searchType,
}: {
  search: string;
  searchType: SearchType;
}) => {
  if (!search) return null;

  if (searchType === 'searchBookName')
    return <SearchBookByNameResults search={search} />;

  return <></>;
};

const SearchBookByNameResults = ({ search }: { search: string }) => {
  const { data, error, isLoading } = useFetchBooks(search);

  if (isLoading) return <Spinner />;
  if (error) return <Text>Nebyly nelezeny žádné výsledky.</Text>;

  const googleBooksResponse: GoogleBookApiResponseType = data;

  if (!googleBooksResponse.items) return null;

  return (
    <VStack gap={8}>
      {googleBooksResponse.items.map((item: any, i: any) => (
        <BookCard book={item} key={i} />
      ))}
    </VStack>
  );
};

export { SearchResult };
