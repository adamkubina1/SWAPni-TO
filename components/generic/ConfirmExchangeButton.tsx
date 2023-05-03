import { confirmExchange } from '@/lib/cloudFunctionsCalls/confirmExchange';
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
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useFunctions } from 'reactfire';

const ConfirmExchangeButton = ({ chatId }: { chatId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const functions = useFunctions();
  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <Button onClick={onOpen} colorScheme={'green'} size={'sm'}>
        Potvrdit výměnu
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Potvrdit výměnu
            </AlertDialogHeader>

            <AlertDialogBody>
              Potvrzením úspěšné výměny smažete původní nabídku a vše s ní
              asociované.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Zrušit
              </Button>
              <Button
                colorScheme='green'
                onClick={() => {
                  setButtonLoading(true);
                  confirmExchange(functions, chatId)
                    .then(() => {
                      setButtonLoading(false);
                      onClose();
                      router.push('/zpravy');
                    })
                    .catch(() => {
                      setButtonLoading(false);
                      toast({
                        title: 'Jejda něco se pokazilo.',
                        description: 'Nepodařilo se potvrdit.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                    });
                }}
                ml={3}
                isLoading={isButtonLoading}
                loadingText={'Potvrzujeme'}
              >
                Potvrdit výměnu
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export { ConfirmExchangeButton };
