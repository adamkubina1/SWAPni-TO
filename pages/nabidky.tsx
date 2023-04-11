import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { deleteBookOffer } from '@/lib/deleteBookOffer';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
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
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { MdInfoOutline, MdMenuBook } from 'react-icons/md';
import { useFirestore, useSigninCheck } from 'reactfire';
import useSWR from 'swr';

const PAGE_TITLE = 'Moje nabídky';
const PAGE_DESCRIPTION =
  'Správa uživatelových nabídek knih do webové aplikace SWAPni TO.';

const Nabidky = () => {
  const signIn = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Moje nabídky knih</Heading>
        {signIn.data?.user?.uid ? (
          <BookOffersSection userId={signIn.data.user?.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

const BookOffersSection = ({ userId }: { userId: string }) => {
  const { status, data: offers } = useFetchAllOffersForUser({ userId });

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      {offers.length > 0 ? (
        offers.map((offer, i) => (
          <BookOfferCard key={i} bookId={offer.bookId} offer={offer} />
        ))
      ) : (
        <Text>
          Žádné nabídky knih k nahlédnutí, přidejte je{' '}
          <Box as={'span'} color={'swap.lightHighlight'}>
            <Link href={'/'}>zde</Link>
          </Box>
          .
        </Text>
      )}
    </>
  );
};

const BookOfferCard = ({ bookId, offer }: { bookId: string; offer: any }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );
  const firestore = useFirestore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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
            <Tooltip
              placement={'top-end'}
              label={'Poznámky: ' + offer.notes}
              fontSize={'md'}
              closeDelay={500}
            >
              <Box _hover={{ cursor: 'pointer' }}>
                <MdInfoOutline size={32} />
              </Box>
            </Tooltip>
            <Tooltip
              placement={'top-start'}
              label={'Stav: ' + offer.bookState}
              fontSize={'md'}
              closeDelay={500}
            >
              <Box _hover={{ cursor: 'pointer' }}>
                <MdMenuBook size={32} />
              </Box>
            </Tooltip>
          </HStack>
        </VStack>
        <Button onClick={onOpen} colorScheme={'red'}>
          Smazat
        </Button>

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
      </Stack>
    </Box>
  );
};

export default Nabidky;
