import { useFetchProfile } from '@/lib/customHooks/firestoreHooks/useFetchProfile';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const ChatInfo = ({ otherUserId }: { otherUserId: string }) => {
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
