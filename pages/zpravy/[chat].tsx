import { BookOfferCollumn } from '@/components/BookOfferCollumn';
import { ConfirmExchangeButton } from '@/components/ConfirmExchangeButton';
import { ChatMessageForm } from '@/components/forms/ChatMessageForm';
import { ProtectedPage } from '@/components/ProtectedPage';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchChat } from '@/lib/customHooks/useFetchChat';
import { useFetchMessages } from '@/lib/customHooks/useFetchMessages';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { deleteChat } from '@/lib/deleteChat';
import { Chat } from '@/lib/types/Chat';
import { Message } from '@/lib/types/Message';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useFirestore, useSigninCheck } from 'reactfire';

const Chat = () => {
  const router = useRouter();
  let { chat } = router.query;
  if (Array.isArray(chat)) {
    chat = chat[0];
  }
  const signedIn = useSigninCheck();

  return (
    <ProtectedPage>
      <VStack pt={'10vh'} justifyContent={'center'} gap={2}>
        {chat ? (
          signedIn.data?.signedIn ? (
            <>
              <ChatControl chatId={chat} userId={signedIn.data.user.uid} />
            </>
          ) : (
            <Spinner />
          )
        ) : (
          <Text>Něco se pokazilo...</Text>
        )}
      </VStack>
    </ProtectedPage>
  );
};

const ChatControl = ({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) => {
  const { status, data: chatData } = useFetchChat(chatId);
  const firestore = useFirestore();
  const router = useRouter();

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  const otherUserId =
    userId === chatData?.exchangeOfferData.senderUserId
      ? chatData?.exchangeOfferData.receiverUserId
      : chatData?.exchangeOfferData.senderUserId;

  return (
    <>
      <ChatInfo otherUserId={otherUserId} />
      <HStack>
        <BookOffer chat={chatData} userId={userId} />
        {chatData.exchangeOfferData.counterOfferId ? (
          <CounterOffer chat={chatData} />
        ) : null}
        <VStack>
          {userId === chatData.exchangeOfferData.receiverUserId ? (
            <ConfirmExchangeButton chatId={chatData.id} />
          ) : null}
          <Button
            size={'sm'}
            colorScheme={'red'}
            onClick={() => {
              router.push('/zpravy').then(() => deleteChat(firestore, chatId));
            }}
          >
            Smazat chat
          </Button>
        </VStack>
      </HStack>
      <ChatWindow chatId={chatId} userId={userId} />
    </>
  );
};

const BookOffer = ({ chat, userId }: { chat: Chat; userId: string }) => {
  return (
    <VStack>
      <Heading size={'xs'} color={'swap.darkHighlight'}>
        {userId === chat.exchangeOfferData.receiverUserId
          ? 'Moje nabídka'
          : 'Jejich nabídka'}
      </Heading>
      <BookOfferCollumn offer={chat.exchangeOfferData.bookOffer} />
    </VStack>
  );
};

const CounterOffer = ({ chat }: { chat: Chat }) => {
  return (
    <VStack>
      <Heading size={'xs'} color={'swap.darkHighlight'}>
        Protinabídka
      </Heading>
      {chat.exchangeOfferData.counterOfferId ? (
        <BookOfferCollumn offer={chat.exchangeOfferData.counterOffer} />
      ) : (
        <Text fontSize={'xs'}>Bez protinabídky</Text>
      )}
    </VStack>
  );
};

const ChatInfo = ({ otherUserId }: { otherUserId: string }) => {
  const { status, data: otherUserData } = useFetchProfile(otherUserId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <HStack align={'center'} justify={'start'}>
      <Link href={'/zpravy'}>
        <ChevronLeftIcon width={20} height={12} _hover={{ opacity: 0.8 }} />
      </Link>
      <Heading size={{ base: 'lg', md: '2xl' }}>
        Chat s{' '}
        <Link href={`/uzivatel/${otherUserId}`}>
          <Box as={'span'} color={'swap.lightHighlight'}>
            {otherUserData.userName}
          </Box>
        </Link>
      </Heading>
    </HStack>
  );
};

const ChatWindow = ({ chatId, userId }: { chatId: string; userId: string }) => {
  const { status, data } = useFetchMessages(chatId);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.scrollTop = ref.current.scrollHeight;
  }, []);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <VStack w={'full'}>
      <VStack
        h={{ base: '45vh', md: '50vh' }}
        w={'full'}
        backgroundColor={'swap.lightBase'}
        borderRadius={'md'}
        overflow={'auto'}
        ref={ref}
        p={1}
      >
        <Text fontSize={'xs'} color={'swap.lightHighlight'}>
          Chat používejte pouze k domluvě výměn,
          <br /> lze zobrazit pouze posledních 30 zpráv!
        </Text>
        <Text fontSize={'xs'} color={'swap.lightHighlight'}></Text>
        {data ? (
          data.map((mes, i) => (
            <ChatMessage key={i} mes={mes} userId={userId} />
          ))
        ) : (
          <Spinner />
        )}
      </VStack>

      <ChatMessageForm chatId={chatId} userId={userId} />
    </VStack>
  );
};

const ChatMessage = ({
  mes,
  userId,
}: {
  mes: Message & { id: string };
  userId: string;
}) => {
  return (
    <HStack
      w={'full'}
      justify={userId === mes.userId ? 'end' : 'start'}
      align={'top'}
    >
      <Link href={`/uzivatel/${mes.userId}`}>
        <UserAvatar size={'sm'} userId={mes.userId} />
      </Link>
      <Box
        borderRadius={'xl'}
        backgroundColor={'swap.darkBase'}
        p={2}
        maxW={'40%'}
        order={userId === mes.userId ? -1 : 1}
      >
        <Text>{mes.message}</Text>
      </Box>
    </HStack>
  );
};

export default Chat;
