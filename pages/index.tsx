import Hits from '@/components/forms/Algolia/Hits';
import SearchBox from '@/components/forms/Algolia/SearchBox';
import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { SearchResult } from '@/components/pageSpecific/home/SearchResult';
import { Seo } from '@/components/Seo';
import { getRandomBook } from '@/lib/getRandomBook';
import { SearchType } from '@/lib/types/Search';
import { Heading, Select, Spinner, Stack, VStack } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  ClearRefinements,
  Configure,
  InstantSearch,
  RefinementList,
} from 'react-instantsearch-dom';
import { useUser } from 'reactfire';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const Home = () => {
  const [search, setSearch] = useState<string>(getRandomBook());
  const [searchType, setSearchType] = useState<SearchType>('searchBookName');

  return (
    <>
      <Seo />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>
          Prozkoumejte SWAPni TO
        </Heading>
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
    <VStack className='ais-InstantSearch' w={'full'}>
      <InstantSearch indexName={'bookTitle'} searchClient={searchClient}>
        <div>
          <SearchBox />
          <Heading size={'sm'}>Stav</Heading>
          <RefinementList attribute={'bookState'} />
          <ClearRefinements
            translations={{
              reset: 'Smazat filtry',
            }}
          />
          <Configure hitsPerPage={8} />
        </div>

        <Hits userUID={user.data?.uid} />
      </InstantSearch>
    </VStack>
  );
};

export default Home;
