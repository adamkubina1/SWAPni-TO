import { BookOfferCollumn } from '@/components/BookOfferCollumn';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { UserRating } from '@/components/UserRating';
import { useFetchAllChats } from '@/lib/customHooks/useFetchAllChats';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { deleteChat } from '@/lib/deleteChat';
import { Chat } from '@/lib/types/Chat';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineMessage } from 'react-icons/md';
import { useFirestore, useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Chaty';
const PAGE_DESCRIPTION =
  'Správa uživatelových chatů ve webové aplikace SWAPni TO.';

const Chats = () => {
  const user = useSigninCheck();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={'10vh'} justifyContent={'center'} gap={6}>
        <Heading size={{ base: 'lg', md: '2xl' }}>Domlouvané výměny</Heading>
        {user.status !== 'loading' && user.data.user?.uid ? (
          <ChatLinks userId={user.data.user?.uid} />
        ) : (
          <Spinner />
        )}
      </VStack>
    </ProtectedPage>
  );
};

const ChatLinks = ({ userId }: { userId: string }) => {
  const { status, data: chats } = useFetchAllChats({ userId: userId });

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <VStack>
      {chats.map((chat, i) => (
        <ChatLink
          key={i}
          chat={chat as Chat & { id: string }}
          userId={userId}
        />
      ))}
    </VStack>
  );
};

const ChatLink = ({
  chat,
  userId,
}: {
  chat: Chat & { id: string };
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
          <Link href={`uzivatel/${chat.exchangeOfferData.receiverUserId}`}>
            <UserAvatar
              userId={chat.exchangeOfferData.receiverUserId}
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
        <Tooltip
          placement={'top-start'}
          label={chat.exchangeOfferData.message}
          fontSize={'md'}
          closeDelay={500}
        >
          <Box _hover={{ cursor: 'pointer' }}>
            <MdOutlineMessage size={24} />
          </Box>
        </Tooltip>

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

          <Button onClick={() => {}} colorScheme={'green'} size={'sm'}>
            Potvrdit výměnu
          </Button>

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

export default Chats;
