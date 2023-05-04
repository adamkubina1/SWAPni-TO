import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { deleteUser, getAuth } from 'firebase/auth';
import { useRef } from 'react';

export const DeleteAccountAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
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
