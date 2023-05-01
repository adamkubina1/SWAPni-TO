import { AddUserReview } from '@/components/forms/AddUserReview';
import NoSSR from '@/components/generic/NoSSR';
import { Seo } from '@/components/generic/Seo';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { UserCreatedContent } from '@/components/pageSpecific/uzivatel/UserCreatedContent';
import { UserDescription } from '@/components/pageSpecific/uzivatel/UserDescription';
import { Flex, Heading, Spinner, Stack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Profil uživatele';
const PAGE_DESCRIPTION = 'Profil uživatele ve webové aplikace SWAPni TO.';

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
      <VStack pt={28} gap={4}>
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

            <VStack align={'start'}>
              {user ? <UserDescription userId={user} /> : <Spinner />}
              {user ? <AddUserReview reviewedUserId={user} /> : <Spinner />}
            </VStack>
          </NoSSR>
        </Stack>

        {user ? <UserCreatedContent userId={user} /> : <Spinner />}
      </VStack>
    </>
  );
};

export default User;
