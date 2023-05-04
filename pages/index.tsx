import { SearchForm } from '@/components/forms/SearchForm';
import { SearchTypeForm } from '@/components/forms/SearchTypeForm';
import NoSSR from '@/components/generic/NoSSR';
import { Seo } from '@/components/generic/Seo';
import { AlgoiliaContainer } from '@/components/pageSpecific/home/Algolia/AlgoliaContainer';
import { SearchResult } from '@/components/pageSpecific/home/SearchResult';
import { getRandomBook } from '@/lib/getRandomBook';
import { SearchType } from '@/lib/types/SearchType';
import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [search, setSearch] = useState<string>(getRandomBook());
  const [searchType, setSearchType] = useState<SearchType>('searchBookName');

  return (
    <>
      <Seo />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <HStack>
          <Heading size={{ base: 'lg', md: '2xl' }}>SWAPni TO </Heading>
          <Box
            w={{ base: 12, md: 16 }}
            h={{ base: 12, md: 16 }}
            position={'relative'}
          >
            <Image src={'/imgs/swap-logo.svg'} fill alt={'SWAPni-to logo'} />
          </Box>
        </HStack>

        <NoSSR>
          <Stack
            direction={{ base: 'column', md: 'column' }}
            align={{ base: 'center', md: 'center' }}
          >
            <SearchTypeForm
              searchType={searchType}
              setSearchType={setSearchType}
            />
            {searchType == 'searchBookName' ? (
              <SearchForm setSearch={setSearch} />
            ) : (
              <AlgoiliaContainer />
            )}
          </Stack>
          {searchType === 'searchBookName' ? (
            <SearchResult search={search} searchType={searchType} />
          ) : null}
        </NoSSR>
      </VStack>
    </>
  );
};

export default Home;
