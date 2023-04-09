import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * TODO add sizes prop to book images to boost performance
 */
const BookCard = ({ book }: { book: GoogleBookApiBook }) => {
  const imgUrl = getHighestSizeLinkUrl(book.volumeInfo?.imageLinks);

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
        <HStack align={'start'}>
          <Box
            pos={'relative'}
            w={{ base: 150, md: 150 }}
            h={{ base: 200, md: 200 }}
            minW={150}
            objectFit={'cover'}
            overflow={'hidden'}
            mr={2}
            borderRadius={'md'}
          >
            <Image
              src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
              fill
              alt={book.volumeInfo.title}
            />
          </Box>
          <VStack align={'left'} pt={4}>
            <Heading size={'md'} noOfLines={{ base: 3, md: 2 }}>
              {book.volumeInfo.title}
            </Heading>
            <Text noOfLines={2} size={'x'}>
              {book.volumeInfo.subtitle}
            </Text>
            <Heading size={'xs'} color={'swap.lightHighlight'}>
              {book.volumeInfo?.authors
                ? book.volumeInfo?.authors.join(', ')
                : null}
            </Heading>
            <Divider backgroundColor={'swap.darkHighlight'}></Divider>
            <Text fontSize={'xs'}>{book.volumeInfo.publishedDate}</Text>
            <Text fontSize={'xs'}>
              Identifikátory:{' '}
              {book.volumeInfo?.industryIdentifiers?.map((item, i) => (
                <span key={i}>
                  {item.identifier}
                  {i !== book.volumeInfo.industryIdentifiers.length - 1
                    ? ', '
                    : null}
                </span>
              ))}
            </Text>
          </VStack>
        </HStack>
      </Link>
    </Box>
  );
};

export { BookCard };
