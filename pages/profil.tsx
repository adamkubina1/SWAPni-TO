import { ChangePasswordForm } from '@/components/forms/ChangePasswordForm';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { deleteUser, getAuth } from 'firebase/auth';
import React from 'react';
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
              {user?.uid ? <UserDescription userId={user.uid} /> : <Spinner />}
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

const DeleteAccountAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const submited = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    deleteUser(user)
      .then(() => {})
      .catch((error) => {
        toast({
          title: 'Vaše relace je příliš stará.',
          description: 'Odhlašte se a znovu přihlašte a zkuste akci znovu.',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} size={'sm'}>
        Smazat účet
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Smazat účet
            </AlertDialogHeader>

            <AlertDialogBody>
              Opravdu chcete permanentně smazat váš uživetelský účet?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Zrušit
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  onClose;
                  submited();
                }}
                ml={3}
              >
                Smazat můj účet
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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

export default Profil;
