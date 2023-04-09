import SearchBox from '@/components/forms/Algolia/SearchBox';
import { SearchForm } from '@/components/forms/SearchForm';
import NoSSR from '@/components/NoSSR';
import { SearchResult } from '@/components/pageSpecific/home/SearchResult';
import { Seo } from '@/components/Seo';
import { SearchType } from '@/lib/types/Search';
import { Heading, Select, Stack, VStack } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  ClearRefinements,
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

const Home = () => {
  const [search, setSearch] = useState<string>('');
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

          <SearchResult search={search} searchType={searchType} />
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
    console.log(event.target.value);
  };

  return (
    <form>
      <Select value={searchType} onChange={handleSelectChange}>
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
  return (
    <VStack className='ais-InstantSearch'>
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
          <Configure hitsPerPage={12} />
        </div>
        <div>
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </VStack>
  );
};

function Hit(props) {
  return (
    <div>
      <img src={props.hit.image} align='left' alt={props.hit.name} />
      <div className='hit-name'>
        <Highlight attribute={'bookTitle'} hit={props.hit} />
      </div>
      <div className='hit-description'>
        <Highlight attribute='description' hit={props.hit} />
      </div>
      <div className='hit-price'>${props.hit.price}</div>
    </div>
  );
}

export default Home;
