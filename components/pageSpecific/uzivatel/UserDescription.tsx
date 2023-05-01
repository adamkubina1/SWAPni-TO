import { UserRating } from '@/components/generic/UserRating';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { Heading, Spinner, Text, VStack } from '@chakra-ui/react';

export const UserDescription = ({ userId }: { userId: string }) => {
  const { data: userFirestore, status } = useFetchProfile(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <VStack textAlign={'left'} align={'start'}>
      <Heading
        size={'lg'}
        color={'swap.darkHighlight'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        {userFirestore?.userName ? userFirestore.userName : 'Nový uživatel'}
      </Heading>
      <Text mb={4}>
        {userFirestore?.bio
          ? userFirestore.bio
          : 'Zatím jsem o sobě nic nenapsal :)'}
      </Text>
      <UserRating
        userRating={userFirestore?.userScore ? userFirestore?.userScore : '0'}
        ratingsCount={
          userFirestore?.reviewsCount ? userFirestore.reviewsCount : '0'
        }
        userId={userId}
      />
    </VStack>
  );
};
