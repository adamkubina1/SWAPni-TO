import { CardContainer } from '@/components/CardContainer';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchAllChats } from '@/lib/customHooks/useFetchAllChats';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { Chat } from '@/lib/types/Chat';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import { Box, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSigninCheck } from 'reactfire';
import useSWR from 'swr';

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

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${chat.exchangeOfferData.bookId}`,
    fetcher
  );
  const bookOfferData = data as GoogleBookApiBook;
  const bookOfferImgUrl = getHighestSizeLinkUrl(
    bookOfferData?.volumeInfo.imageLinks
  );

  return (
    <CardContainer>
      <HStack align={'start'}>
        <VStack>
          <Heading size={'xs'}>S kým?</Heading>
          <Link href={`/uzivatel/${otherUserId}`}>
            <UserAvatar size={'md'} userId={otherUserId} />
          </Link>
          <Text>
            {status === 'loading' ? <Spinner /> : otherUserData.userName}
          </Text>
        </VStack>
        <VStack>
          <Heading size={'xs'}>Co?</Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <VStack>
              <Link href={`/kniha/${bookOfferData.id}`}>
                <Box
                  // w={{ base: 150, md: 150 }}
                  h={{ base: 120, md: 120 }}
                  minW={100}
                  objectFit={'cover'}
                  overflow={'hidden'}
                  position={'relative'}
                  borderRadius={'md'}
                >
                  <Image
                    src={
                      bookOfferImgUrl ? bookOfferImgUrl : 'book-placeholder.jpg'
                    }
                    fill
                    alt={bookOfferData.volumeInfo.title}
                  />
                </Box>
              </Link>
              <Text>{bookOfferData.volumeInfo.title}</Text>
            </VStack>
          )}
        </VStack>
        <Link href={`/zpravy/${chat.id}`}>
          <Text>Link to chat</Text>
        </Link>
      </HStack>
    </CardContainer>
  );
};

export default Chats;
