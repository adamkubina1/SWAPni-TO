import { BookOfferCollumn } from '@/components/generic/BookOfferCollumn';
import { ConfirmExchangeButton } from '@/components/generic/ConfirmExchangeButton';
import { ResponsiveTooltip } from '@/components/generic/ResponsiveTootip';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { UserRating } from '@/components/generic/UserRating';
import { useFetchProfile } from '@/lib/customHooks/firestoreHooks/useFetchProfile';
import { deleteChat } from '@/lib/firestoreCalls/deleteChat';
import { ChatType } from '@/lib/types/ChatType';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineMessage } from 'react-icons/md';
import { useFirestore } from 'reactfire';

export const ChatLinkCard = ({
  chat,
  userId,
}: {
  chat: ChatType & { id: string };
  userId: string;
}) => {
  const otherUserId =
    userId === chat.exchangeOfferData.receiverUserId
      ? chat.exchangeOfferData.senderUserId
      : chat.exchangeOfferData.receiverUserId;
  const { status, data: otherUserData } = useFetchProfile(otherUserId);
  const firestore = useFirestore();
  const router = useRouter();

  if (status === 'error') return null;
  if (status === 'loading') return <Spinner />;

  return (
    <Box
      boxShadow={'xl'}
      color={'swap.darkText'}
      borderRadius={'md'}
      borderColor={'swap.lightBase'}
      _hover={{
        boxShadow: 'dark-lg',
      }}
      py={{ base: 4, md: 1 }}
      px={{ base: 2, md: 4 }}
    >
      <Stack direction={{ base: 'column', md: 'row' }} align={'center'} gap={4}>
        <VStack>
          <Link
            href={`uzivatel/${
              chat.exchangeOfferData.receiverUserId === userId
                ? chat.exchangeOfferData.senderUserId
                : chat.exchangeOfferData.receiverUserId
            }`}
          >
            <UserAvatar
              userId={
                chat.exchangeOfferData.receiverUserId === userId
                  ? chat.exchangeOfferData.senderUserId
                  : chat.exchangeOfferData.receiverUserId
              }
              size={'md'}
            />
          </Link>
          <UserRating
            userRating={otherUserData.userScore}
            ratingsCount={otherUserData.reviewsCount}
            userId={otherUserData.id}
          />
          <Heading size={'xs'} color={'swap.lightHighlight'}>
            {otherUserData?.userName ? otherUserData.userName : null}
          </Heading>
        </VStack>
        <HStack align={'start'}>
          <VStack align={'center'} maxW={'105'}>
            <Heading size={'xs'} color={'swap.darkHighlight'}>
              {userId === chat.exchangeOfferData.receiverUserId
                ? 'Moje nabídka'
                : 'Jejich nabídka'}
            </Heading>
            <BookOfferCollumn offer={chat.exchangeOfferData.bookOffer} />
          </VStack>
          <VStack align={'center'} maxW={'105'}>
            <Heading size={'xs'} color={'swap.darkHighlight'}>
              Protinabídka
            </Heading>
            {chat.exchangeOfferData.counterOfferId ? (
              <BookOfferCollumn offer={chat.exchangeOfferData.counterOffer} />
            ) : (
              <Text>Nabyla nabídnuta</Text>
            )}
          </VStack>
        </HStack>
        <ResponsiveTooltip
          placement={'top-start'}
          text={chat.exchangeOfferData.message}
        >
          <Box _hover={{ cursor: 'pointer' }}>
            <MdOutlineMessage size={24} />
          </Box>
        </ResponsiveTooltip>

        <VStack>
          <Button
            onClick={() => {
              router.push(`/zpravy/${chat.id}`);
            }}
            colorScheme={'blue'}
            size={'sm'}
            mb={6}
          >
            Přejít na chat
          </Button>

          {userId === chat.exchangeOfferData.receiverUserId ? (
            <ConfirmExchangeButton chatId={chat.id} />
          ) : null}

          <Button
            onClick={() => deleteChat(firestore, chat.id)}
            colorScheme={'red'}
            size={'sm'}
          >
            Smazat chat
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};
