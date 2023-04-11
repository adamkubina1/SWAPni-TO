import Hits from '@/components/forms/Algolia/Hits';
import Pagination from '@/components/forms/Algolia/Pagination';
import RefinementList from '@/components/forms/Algolia/RefinementList';
import SearchBox from '@/components/forms/Algolia/SearchBox';
import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { SearchResult } from '@/components/pageSpecific/home/SearchResult';
import { Seo } from '@/components/Seo';
import { getRandomBook } from '@/lib/getRandomBook';
import { SearchType } from '@/lib/types/Search';
import { algoliaConfig } from '@/utils/algoliaConfig';
import {
  Box,
  Heading,
  HStack,
  Select,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  ClearRefinements,
  Configure,
  InstantSearch,
  SortBy,
} from 'react-instantsearch-dom';
import { useUser } from 'reactfire';

const searchClient = algoliasearch(algoliaConfig.appID, algoliaConfig.apiKey);

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
              <BookOffers />
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

const searchOptions: Array<{ value: SearchType; description: string }> = [
  { value: 'searchBookName', description: 'Knihu název/autora/ISBN' },
  { value: 'searchOffer', description: 'Nabídku dle názvu knihy' },
];

const SearchTypeForm = ({
  searchType,
  setSearchType,
}: {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as SearchType);
  };

  return (
    <form>
      <Select
        value={searchType}
        onChange={handleSelectChange}
        color={'swap.lightHighlight'}
      >
        {searchOptions.map((option, i) => (
          <option id={'searchOption'} key={i} value={option.value}>
            {option.description}
          </option>
        ))}
      </Select>
    </form>
  );
};

const BookOffers = () => {
  const user = useUser();

  if (user.status === 'loading') return <Spinner />;

  return (
    <VStack className='ais-InstantSearch' w={'full'} gap={4}>
      <InstantSearch indexName={'bookTitle'} searchClient={searchClient}>
        <VStack gap={6}>
          <SearchBox />
          <HStack gap={2} align={'start'}>
            <VStack>
              <Heading size={'sm'}>Stav</Heading>
              <RefinementList attribute={'bookState'} />
              <ClearRefinements
                translations={{
                  reset: 'Smazat filtry',
                }}
              />
            </VStack>
            <Box color={'swap.lightHighlight'}>
              <SortBy
                defaultRefinement='bookTitle'
                items={[
                  { value: 'bookTitle', label: 'Seřadit' },
                  { value: 'time_asc', label: 'Nejstarší' },
                  { value: 'time_desc', label: 'Nejnovější' },
                ]}
              />
            </Box>
          </HStack>
          <Configure hitsPerPage={5} />
        </VStack>

        <Hits userUID={user.data?.uid} />
        <Pagination />
      </InstantSearch>
    </VStack>
  );
};

export default Home;
