import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';

export const UserInfo = ({ userId }: { userId: string }) => {
  const { data: userFirestore, status } = useFetchProfile(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <Box textAlign={'left'}>
      <Heading
        size={'lg'}
        color={'swap.darkHighlight'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        {userFirestore?.userName ? userFirestore.userName : 'Nový uživatel'}
      </Heading>
      <Text>
        {userFirestore?.bio
          ? userFirestore.bio
          : 'Zatím jsem o sobě nic nenapsal :)'}
      </Text>
    </Box>
  );
};
