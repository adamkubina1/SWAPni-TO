import { useFetchBook } from '@/lib/customHooks/googleBooksHooks/useFetchBook';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookOffer } from '@/lib/types/BookOffer';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Box, Heading, HStack, Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { MdInfoOutline, MdMenuBook } from 'react-icons/md';
import { ResponsiveTooltip } from './ResponsiveTootip';

const BookOfferCollumn = ({ offer }: { offer: BookOffer }) => {
  const { data, error, isLoading } = useFetchBook(offer.bookId);

  if (error) return null;
  if (isLoading) return <Spinner />;

  const bookData = data as GoogleBookApiBook;

  const imgUrlOther = getHighestSizeLinkUrl(bookData?.volumeInfo?.imageLinks);

  return (
    <>
      <Link href={`/kniha/${offer.bookId}`}>
        <Box
          pos={'relative'}
          w={84}
          h={112}
          minW={84}
          objectFit={'cover'}
          overflow={'hidden'}
          mr={2}
          borderRadius={'md'}
        >
          <Image
            src={imgUrlOther ? imgUrlOther : '/imgs/book-placeholder.jpg'}
            fill
            alt={bookData?.volumeInfo?.title}
          />
        </Box>
      </Link>
      <Heading size={'xs'}>{bookData?.volumeInfo?.title}</Heading>
      <HStack>
        <ResponsiveTooltip
          placement={'top-end'}
          text={'Poznámky: ' + offer.notes}
        >
          <Box _hover={{ cursor: 'pointer' }}>
            <MdInfoOutline size={24} />
          </Box>
        </ResponsiveTooltip>
        <ResponsiveTooltip
          placement={'top-start'}
          text={'Stav: ' + offer.bookState}
        >
          <Box _hover={{ cursor: 'pointer' }}>
            <MdMenuBook size={24} />
          </Box>
        </ResponsiveTooltip>
      </HStack>
    </>
  );
};

export { BookOfferCollumn };
