import { EditProfileForm } from '@/components/forms/EditProfileForm';
import { EditProfilePicForm } from '@/components/forms/EditProfilePicForm';
import { ModalContainer } from '@/components/modals/ModalContainer';
import NoSSR from '@/components/NoSSR';
import { ProtectedPage } from '@/components/ProtectedPage';
import { Seo } from '@/components/Seo';
import { useFetchAvatarUrl } from '@/lib/customHooks/useFetchAvatarUrl';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { Avatar, Box, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import { useUser } from 'reactfire';

const PAGE_TITLE = 'Můj profil';
const PAGE_DESCRIPTION = 'Můj profil ve webové aplikace SWAPni TO.';

const Profil = () => {
  const { data: user } = useUser();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          pt={28}
          gap={{ base: 0, md: '12' }}
        >
          <NoSSR>
            {user?.uid ? <UserAvatar userId={user.uid} /> : <Spinner />}
            {user?.uid ? <UserDescription userId={user.uid} /> : <Spinner />}
          </NoSSR>
        </Stack>
        <NoSSR>
          <ModalContainer
            modalButtonText={'Upravit profil'}
            modalHeaderText={'Upravit profil'}
          >
            <EditProfileForm />
            <Box mt={8}>
              <EditProfilePicForm />
            </Box>
          </ModalContainer>
        </NoSSR>
      </VStack>
    </ProtectedPage>
  );
};

const UserDescription = ({ userId }: { userId: string }) => {
  const { data: userFirestore, status } = useFetchProfile(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <Text>
      {userFirestore.bio
        ? userFirestore.bio
        : 'Zatím jsem o sobě nic nenapsal :)'}
    </Text>
  );
};

const UserAvatar = ({ userId }: { userId: string }) => {
  const { status, data: imageURL } = useFetchAvatarUrl(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return <Avatar size={'2xl'} src={imageURL} />;
};

export default Profil;
