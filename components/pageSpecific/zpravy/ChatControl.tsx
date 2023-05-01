import { BookOfferCollumn } from '@/components/generic/BookOfferCollumn';
import { ConfirmExchangeButton } from '@/components/generic/ConfirmExchangeButton';
import { useFetchChat } from '@/lib/customHooks/useFetchChat';
import { deleteChat } from '@/lib/deleteChat';
import { Chat } from '@/lib/types/Chat';
import {
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useFirestore } from 'reactfire';
import { ChatInfo } from './ChatInfo';
import { ChatWindow } from './ChatWindow';

export const ChatControl = ({
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
