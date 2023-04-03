import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

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
            <Image
              src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
              fill
              alt={book.volumeInfo.title}
            />
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

export { BookCard };
