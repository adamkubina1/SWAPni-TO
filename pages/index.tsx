import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { SearchType } from '@/lib/types/Search';
import { Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import useSWR from 'swr';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('none');

  return (
    <>
      <Seo />
      <VStack pt={{ base: '10vh', md: '10vh' }} justifyContent={'center'}>
        <Heading size={{ base: 'lg', md: '2xl' }}>
          Prozkoumejte SWAPni TO
        </Heading>
        <NoSSR>
          <SearchForm setSearch={setSearch} setSearchType={setSearchType} />
          <SearchResult search={search} searchType={searchType} />
        </NoSSR>
      </VStack>
    </>
  );
};

const SearchResult = ({
  search,
  searchType,
}: {
  search: string;
  searchType: SearchType;
}) => {
  if (searchType === 'none') return <></>;

  if (searchType === 'searchBookName')
    return <SearchBookByNameResults search={search} />;

  if (searchType === 'searchUser') return <> User {search}</>;
  return <></>;
};

const SearchBookByNameResults = ({ search }: { search: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading, isValidating } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${search}`,
    fetcher
  );

  if (isLoading || isValidating) return <Spinner />;
  if (error) return <Text>Nebyly nelezeny žádné výsledky.</Text>;

  console.log(data);

  return <></>;
};

export default Home;
