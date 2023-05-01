import { ChatMessageForm } from '@/components/forms/ChatMessageForm';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { useFetchMessages } from '@/lib/customHooks/useFetchMessages';
import { Message } from '@/lib/types/Message';
import { Box, HStack, Link, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export const ChatWindow = ({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) => {
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
