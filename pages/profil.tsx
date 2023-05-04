import { ChangePasswordForm } from '@/components/forms/ChangePasswordForm';
import { EditProfileForm } from '@/components/forms/EditProfileForm';
import { EditProfilePicForm } from '@/components/forms/EditProfilePicForm';
import { EditUserNameForm } from '@/components/forms/EditUserNameForm';
import NoSSR from '@/components/generic/NoSSR';
import { ProtectedPage } from '@/components/generic/ProtectedPage';
import { Seo } from '@/components/generic/Seo';
import { UserAvatar } from '@/components/generic/UserAvatar';
import { ModalContainer } from '@/components/modals/ModalContainer';
import { DeleteAccountAlert } from '@/components/pageSpecific/profil/DeleteAccountAlert';
import { UserInfo } from '@/components/pageSpecific/profil/UserInfo';
import { Box, Flex, Heading, Spinner, Stack, VStack } from '@chakra-ui/react';
import { useUser } from 'reactfire';

const PAGE_TITLE = 'Můj profil';
const PAGE_DESCRIPTION = 'Můj profil ve webové aplikace SWAPni TO.';

const Profil = () => {
  const { data: user } = useUser();

  return (
    <ProtectedPage>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack pt={28} gap={4}>
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
              {user?.uid ? <UserInfo userId={user.uid} /> : <Spinner />}
            </VStack>
          </NoSSR>
        </Stack>
        <NoSSR>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <ModalContainer
              modalButtonText={'Upravit profil'}
              modalHeaderText={'Upravit profil'}
              variant={'swapDarkOutline'}
            >
              <Box mb={8}>
                <EditUserNameForm />
              </Box>
              <EditProfileForm />
              <Box mt={8}>
                <EditProfilePicForm />
              </Box>
            </ModalContainer>
            {user?.providerData[0].providerId === 'password' ? (
              <ChangePasswordForm />
            ) : null}
            <DeleteAccountAlert />
          </Stack>
        </NoSSR>
      </VStack>
    </ProtectedPage>
  );
};

export default Profil;
