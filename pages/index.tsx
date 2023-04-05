import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { SearchResult } from '@/components/pageSpecific/home/SearchResult';
import { Seo } from '@/components/Seo';
import { SearchType } from '@/lib/types/Search';
import { Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('none');

  return (
    <>
      <Seo />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
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

export default Home;
