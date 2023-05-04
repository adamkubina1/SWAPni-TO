import { useFetchAllReviews } from '@/lib/customHooks/firestoreHooks/useFetchAllReviews';
import { UserReviewType } from '@/lib/types/UserReviewType';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Rating } from './Ratings';

const UserRating = ({
  userRating,
  ratingsCount,
  userId,
}: {
  userRating: string;
  ratingsCount: string;
  userId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack
        justify={'center'}
        align={'center'}
        onClick={onOpen}
        _hover={{ cursor: 'pointer' }}
      >
        <Rating maxRating={5} rating={Number(userRating) - 0.5} />
        <Text fontSize={'xs'}>
          {Number(userRating).toFixed(1)}
          {' ('}
          {ratingsCount}
          {')'}
        </Text>
      </VStack>
      <UserReviewsModal isOpen={isOpen} onClose={onClose} userId={userId} />
    </>
  );
};

const UserReviewsModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}) => {
  const { status, data } = useFetchAllReviews(userId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor={'swap.lightBase'} color={'swap.lightText'}>
        <ModalHeader>Recenze na uživatele</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {status === 'loading' ? (
            <Spinner />
          ) : (
            <VStack gap={3}>
              {data.map((review, i) => (
                <SingelUserReview key={i} review={review} />
              ))}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>
            Zavřít
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SingelUserReview = ({ review }: { review: UserReviewType }) => {
  return (
    <HStack w={'full'} justify={'start'} align={'center'}>
      <Rating maxRating={5} rating={Number(review.stars) - 0.5} />
      <Text>{review.review}</Text>
    </HStack>
  );
};

export { UserRating };
