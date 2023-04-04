import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

const PAGE_TITLE = 'Profil uživatele';
const PAGE_DESCRIPTION = 'Profil uživatele ve webové aplikace SWAPni TO.';

/**
 * User page takes uid to display info -> this should be username in future
 */
const User = () => {
  const router = useRouter();
  let { user } = router.query;
  if (Array.isArray(user)) {
    user = user[0];
  }

  return (
    <>
      {user ? (
        <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      ) : (
        <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      )}
      <VStack pt={28}>
        <Heading size={{ base: 'xl', md: '2xl' }}>Profil uživatele</Heading>
        <Stack
          pt={6}
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 0, md: '12' }}
        >
          <NoSSR>
            {user ? (
              <Flex justify={'center'}>
                <UserAvatar userId={user} size={'2xl'} />
              </Flex>
            ) : (
              <Spinner />
            )}

            <VStack>
              {user ? <UserDescription userId={user} /> : <Spinner />}
            </VStack>
          </NoSSR>
        </Stack>
      </VStack>
    </>
  );
};

const UserDescription = ({ userId }: { userId: string }) => {
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

export default User;
