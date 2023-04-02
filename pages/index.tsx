import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { SearchForm } from '@/components/forms/SearchForm';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import {
  GoogleBookApiBook,
  GoogleBookApiResponseType,
} from '@/lib/types/GoogleBooksApi';
import { SearchType } from '@/lib/types/Search';
import { Box, HStack, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('none');

  return (
    <>
      <Seo />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={6}
      >
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
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes?q=${search}&projection=full`,
    fetcher
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text>Nebyly nelezeny žádné výsledky.</Text>;

  const googleBooksResponse: GoogleBookApiResponseType = data;

  return (
    <VStack gap={8}>
      {googleBooksResponse.items.map((item: any, i: any) => (
        <BookCard book={item} key={i} />
      ))}
    </VStack>
  );
};

/**
 * TODO add sizes prop to book images to boost performance
 */
const BookCard = ({ book }: { book: GoogleBookApiBook }) => {
  const imgUrl = getHighestSizeLinkUrl(book.volumeInfo.imageLinks);

  return (
    <Box
      backgroundColor={'swap.lightBase'}
      boxShadow={'dark-lg'}
      w={'100%'}
      color={'swap.lightText'}
      borderRadius={'md'}
      p={1}
    >
      <Link href={`/kniha/${book.id}`}>
        <HStack>
          <Box
            pos={'relative'}
            w={{ base: 150, md: 150 }}
            h={{ base: 200, md: 200 }}
            minW={150}
            objectFit={'cover'}
            overflow={'hidden'}
            mr={2}
          >
            {imgUrl ? (
              <NextImage src={imgUrl} fill alt={book.volumeInfo.title} />
            ) : (
              <NextImage
                src={'/imgs/book-placeholder.jpg'}
                fill
                alt={book.volumeInfo.title}
              />
            )}
          </Box>
          <VStack align={'flex-start'}>
            <Heading size={'md'} noOfLines={2}>
              {book.volumeInfo.title}
            </Heading>
            <Text noOfLines={2} size={'x'}>
              {book.volumeInfo.subtitle}
            </Text>
            <Heading size={'xs'}>
              {book.volumeInfo?.authors
                ? book.volumeInfo?.authors.join(', ')
                : null}
            </Heading>
          </VStack>
        </HStack>
      </Link>
    </Box>
  );
};

export default Home;
