import { ResponsiveTooltip } from '@/components/generic/ResponsiveTootip';
import { useFetchBook } from '@/lib/customHooks/googleBooksHooks/useFetchBook';
import { deleteBookOffer } from '@/lib/firestoreCalls/deleteBookOffer';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookOffer } from '@/lib/types/BookOffer';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { MdInfoOutline, MdMenuBook } from 'react-icons/md';
import { useFirestore } from 'reactfire';

export const BookOfferCard = ({
  bookId,
  offer,
}: {
  bookId: string;
  offer: any;
}) => {
  const { data, error, isLoading } = useFetchBook(bookId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading color={'red'}>Něco se pokazilo...</Heading>;
  }

  const bookData: GoogleBookApiBook = data;

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
          <Link href={`/kniha/${offer.bookId}`}>
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

        <VStack gap={3}>
          <HStack>
            <ResponsiveTooltip
              placement={'top-end'}
              text={'Poznámky: ' + offer.notes}
            >
              <Box _hover={{ cursor: 'pointer' }}>
                <MdInfoOutline size={32} />
              </Box>
            </ResponsiveTooltip>
            <ResponsiveTooltip
              placement={'top-start'}
              text={'Stav: ' + offer.bookState}
            >
              <Box _hover={{ cursor: 'pointer' }}>
                <MdMenuBook size={32} />
              </Box>
            </ResponsiveTooltip>
          </HStack>
        </VStack>
        <Button onClick={onOpen} colorScheme={'red'}>
          Smazat
        </Button>
        <DeleteOfferAlert isOpen={isOpen} onClose={onClose} offer={offer} />
      </Stack>
    </Box>
  );
};

const DeleteOfferAlert = ({
  isOpen,
  onClose,
  offer,
}: {
  isOpen: boolean;
  onClose: () => void;
  offer: BookOffer & { id: string };
}) => {
  const cancelRef = useRef(null);
  const firestore = useFirestore();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Smazat nabídku knihy
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>
              Smazání nabídky zároveň smaže všechny žádosti a chaty s ní
              asociované.
            </Text>
            <Text>
              Toto platí i pro takové, kde figuruje jako protinabídka!
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Zrušit
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                deleteBookOffer(firestore, offer.id);
                onClose();
              }}
              ml={3}
            >
              Smazat nabídku
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
