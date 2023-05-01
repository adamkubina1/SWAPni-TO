import { useFetchAllChats } from '@/lib/customHooks/firestoreHooks/useFetchAllChats';
import { ChatType } from '@/lib/types/ChatType';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import { ChatLinkCard } from './ChatLinkCard';

export const ChatLinks = ({ userId }: { userId: string }) => {
  const { status, data: chats } = useFetchAllChats(userId);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <Text>Něco se pokazilo...</Text>;

  return (
    <VStack gap={4}>
      {chats.map((chat, i) => (
        <ChatLinkCard
          key={i}
          chat={chat as ChatType & { id: string }}
          userId={userId}
        />
      ))}
    </VStack>
  );
};
