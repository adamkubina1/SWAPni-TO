import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { ChatControl } from '@/components/pageSpecific/zpravy/ChatControl';
import { Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSigninCheck } from 'reactfire';

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

export default Chat;
