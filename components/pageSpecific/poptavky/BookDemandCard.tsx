import { useFetchBook } from '@/lib/customHooks/useFetchBook';
import { deleteDemand } from '@/lib/deleteDemand';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookDemand } from '@/lib/types/BookDemand';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useFirestore } from 'reactfire';

export const BookDemandCard = ({
  demand,
}: {
  demand: BookDemand & { id: string };
}) => {
  const book = useFetchBook(demand.bookId);
  const firestore = useFirestore();

  if (book.isLoading) return <Spinner />;
  if (book.error) return <Text>Něco se pokazilo...</Text>;

  const bookData: GoogleBookApiBook = book.data;

  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <Box
      boxShadow={'xl'}
      color={'swap.darkText'}
      borderRadius={'md'}
      borderColor={'swap.lightBase'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      py={{ base: 4, md: 0 }}
      pr={{ base: 0, md: 4 }}
    >
      <Stack
        gap={{ base: 4, md: 1 }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'center' }}
      >
        <VStack align={'center'} maxW={'105'}>
          <Link href={`/kniha/${demand.bookId}`}>
            <Box
              pos={'relative'}
              w={105}
              h={140}
              minW={90}
              objectFit={'cover'}
              overflow={'hidden'}
              mr={2}
              borderRadius={'md'}
            >
              <Image
                src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
                fill
                alt={bookData.volumeInfo.title}
              />
            </Box>
          </Link>
          <Heading size={'xs'}>{bookData.volumeInfo.title}</Heading>
        </VStack>

        <Button
          onClick={() => deleteDemand(firestore, demand.id)}
          colorScheme={'red'}
        >
          Smazat
        </Button>
      </Stack>
    </Box>
  );
};
