import { useFetchBook } from '@/lib/customHooks/useFetchBook';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { BookOffer } from '@/lib/types/BookOffer';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { MdInfoOutline, MdMenuBook } from 'react-icons/md';
import { CreateExchangeOfferForm } from './forms/CreateExchangeOfferForm';
import { UserAvatar } from './UserAvatar';
import { UserRating } from './UserRating';

const OfferCard = ({
  offer,
  userUID,
}: {
  offer: BookOffer & { id: string };
  userUID: string | undefined;
}) => {
  const { data: userFirestore, status } = useFetchProfile(offer.userId);
  const book = useFetchBook(offer.bookId);

  if (status === 'loading') return <Spinner />;
  if (book.isLoading) return <Spinner />;

  const imgUrl = getHighestSizeLinkUrl(book.data.volumeInfo?.imageLinks);

  return (
    <Box
      boxShadow={'xl'}
      w={'100%'}
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
                alt={book.data.volumeInfo.title}
              />
            </Box>
          </Link>
          <Heading size={'xs'}>{book.data.volumeInfo.title}</Heading>
        </VStack>
        <VStack>
          <Link href={`/uzivatel/${offer.userId}`}>
            <UserAvatar userId={offer.userId} size={'sm'} />
          </Link>
          <UserRating
            userRating={userFirestore.userScore}
            ratingsCount={userFirestore.reviewsCount}
            userId={userFirestore.id}
          />
          <Heading size={'xs'} color={'swap.lightHighlight'}>
            {userFirestore?.userName}
          </Heading>
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
          <FormButtons
            userUID={userUID}
            offerUserID={userFirestore.id}
            offer={offer}
          />
        </VStack>
      </Stack>
    </Box>
  );
};

const FormButtons = ({
  userUID,
  offerUserID,
  offer,
}: {
  userUID: string | undefined;
  offerUserID: string;
  offer: BookOffer & { id: string };
}) => {
  if (!userUID || userUID.length < 1)
    return (
      <Link href={'/prihlaseni'}>
        <Text fontSize={'xs'}>Žádost o výměnu vyžaduje přihlášení</Text>
      </Link>
    );

  if (userUID !== offerUserID)
    return (
      <CreateExchangeOfferForm
        receiverUserId={offer.userId}
        bookId={offer.bookId}
        bookOfferId={offer.objectID ? offer.objectID : offer.id}
        bookOffer={{
          bookState: offer.bookState,
          bookTitle: offer.bookTitle,
          bookId: offer.bookId,
          notes: offer.notes,
          userId: offer.userId,
        }}
      />
    );

  return (
    <Button size={'sm'} variant={'swapLightSolid'} isDisabled>
      Požádat o výměnu
    </Button>
  );
};

export { OfferCard };
