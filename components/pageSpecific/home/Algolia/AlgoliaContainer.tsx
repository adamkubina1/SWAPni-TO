import { algoliaConfig } from '@/utils/algoliaConfig';
import { Box, Heading, HStack, Spinner, VStack } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch';
import {
  ClearRefinements,
  Configure,
  InstantSearch,
  SortBy,
} from 'react-instantsearch-dom';
import { useUser } from 'reactfire';
import Hits from './Hits';
import Pagination from './Pagination';
import RefinementList from './RefinementList';
import SearchBox from './SearchBox';

const searchClient = algoliasearch(
  algoliaConfig.appID ? algoliaConfig.appID : '',
  algoliaConfig.apiKey ? algoliaConfig.apiKey : ''
);

export const AlgoiliaContainer = () => {
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
                defaultRefinement='time_desc'
                items={[
                  { value: 'bookTitle', label: 'Bez řazení' },
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
