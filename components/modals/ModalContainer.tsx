import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const ModalContainer = ({
  children,
  modalButtonText,
  modalHeaderText,
}: {
  children?: ReactNode;
  modalButtonText?: string;
  modalHeaderText?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant={'swapDarkOutline'}>
        {modalButtonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          backgroundColor={'swap.lightBase'}
          color={'swap.lightText'}
        >
          <ModalHeader>{modalHeaderText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Zrušit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ModalContainer };
