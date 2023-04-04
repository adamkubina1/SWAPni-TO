import { EditProfileForm } from '@/components/forms/EditProfileForm';
import { EditProfilePicForm } from '@/components/forms/EditProfilePicForm';
import { EditUserNameForm } from '@/components/forms/EditUserNameForm';
import { ModalContainer } from '@/components/modals/ModalContainer';
import NoSSR from '@/components/NoSSR';
import { ProtectedPage } from '@/components/ProtectedPage';
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
  VStack
} from '@chakra-ui/react';
import { useUser } from 'reactfire';

const PAGE_TITLE = 'Můj profil';
const PAGE_DESCRIPTION = 'Můj profil ve webové aplikace SWAPni TO.';

const Profil = () => {
  const { data: user } = useUser();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={28}>
        <Heading size={{ base: 'xl', md: '2xl' }}>Můj profil</Heading>
        <Stack
          pt={6}
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 0, md: '12' }}
          justifyContent={'center'}
        >
          <NoSSR>
            {user?.uid ? (
              <Flex justify={'center'}>
                <UserAvatar userId={user.uid} size={'2xl'} />
              </Flex>
            ) : (
              <Spinner />
            )}
            <VStack>
              {user?.uid ? <UserDescription userId={user.uid} /> : <Spinner />}
            </VStack>
          </NoSSR>
        </Stack>
        <NoSSR>
          <ModalContainer
            modalButtonText={'Upravit profil'}
            modalHeaderText={'Upravit profil'}
          >
            <Box mb={8}>
              <EditUserNameForm />
            </Box>
            <EditProfileForm />
            <Box mt={8}>
              <EditProfilePicForm />
            </Box>
          </ModalContainer>
        </NoSSR>
        {user?.uid ? <UserCreatedContent userId={user.uid} /> : <Spinner />}
      </VStack>
    </ProtectedPage>
  );
};

const UserCreatedContent = ({ userId }: { userId: string }) => {
  return <>TODO user content</>
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

export default Profil;
