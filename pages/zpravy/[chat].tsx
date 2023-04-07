import { ChatMessageForm } from '@/components/forms/ChatMessageForm';
import { ProtectedPage } from '@/components/ProtectedPage';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchChat } from '@/lib/customHooks/useFetchChat';
import { useFetchMessages } from '@/lib/customHooks/useFetchMessages';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { deleteChat } from '@/lib/deleteChat';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Message } from '@/lib/types/Message';
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useFirestore, useSigninCheck } from 'reactfire';
import useSWR from 'swr';

const Chat = () => {
  const router = useRouter();
  let { chat } = router.query;
  if (Array.isArray(chat)) {
    chat = chat[0];
  }
  const signedIn = useSigninCheck();

  return (
    <ProtectedPage>
      <VStack pt={'10vh'} justifyContent={'center'} gap={1}>
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
        <BookOffer bookId={chatData?.exchangeOfferData.bookId} />
        {chatData.exchangeOfferData.counterOfferId ? (
          <CounterOffer
            bookId={chatData.exchangeOfferData.counterOffer.bookId}
          />
        ) : null}
        <VStack>
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

const BookOffer = ({ bookId }: { bookId: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text>Něco se pokazilo...</Text>;

  const bookOfferData = data as GoogleBookApiBook;
  const bookOfferImgUrl = getHighestSizeLinkUrl(
    bookOfferData?.volumeInfo.imageLinks
  );

  return (
    <VStack>
      <Heading size={'xs'}>O co jde?</Heading>
      <Box
        pos={'relative'}
        w={90}
        h={120}
        minW={90}
        objectFit={'cover'}
        overflow={'hidden'}
        mr={2}
        borderRadius={'md'}
      >
        <Link href={`/kniha/${bookId}`}>
          <Image
            src={
              bookOfferImgUrl ? bookOfferImgUrl : '/imgs/book-placeholder.jpg'
            }
            fill
            alt={bookOfferData.volumeInfo?.title}
          />
        </Link>
      </Box>
    </VStack>
  );
};

const CounterOffer = ({ bookId }: { bookId: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text>Něco se pokazilo...</Text>;

  const bookOfferData = data as GoogleBookApiBook;
  const bookOfferImgUrl = getHighestSizeLinkUrl(
    bookOfferData?.volumeInfo.imageLinks
  );

  return (
    <VStack>
      <Heading size={'xs'}>Protinabídka</Heading>
      <Box
        pos={'relative'}
        w={90}
        h={120}
        minW={90}
        objectFit={'cover'}
        overflow={'hidden'}
        mr={2}
        borderRadius={'md'}
      >
        <Link href={`/kniha/${bookId}`}>
          <Image
            src={
              bookOfferImgUrl ? bookOfferImgUrl : '/imgs/book-placeholder.jpg'
            }
            fill
            alt={bookOfferData.volumeInfo?.title}
          />
        </Link>
      </Box>
    </VStack>
  );
};

const ChatInfo = ({ otherUserId }: { otherUserId: string }) => {
  const { status, data: otherUserData } = useFetchProfile(otherUserId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <Heading size={{ base: 'lg', md: '2xl' }}>
      Chat s{' '}
      <Link href={`/uzivatel/${otherUserId}`}>
        <Box as={'span'} color={'swap.lightHighlight'}>
          {otherUserData.userName}
        </Box>
      </Link>
    </Heading>
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
        h={{ base: '55vh', md: '60vh' }}
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
