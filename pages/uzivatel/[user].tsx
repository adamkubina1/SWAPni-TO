import { AddUserReview } from '@/components/forms/AddUserReview';
import NoSSR from '@/components/NoSSR';
import { OfferCard } from '@/components/OfferCard';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { UserRating } from '@/components/UserRating';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { BookOffer } from '@/lib/types/BookOffer';
import { Flex, Heading, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSigninCheck } from 'reactfire';

const PAGE_TITLE = 'Profil uživatele';
const PAGE_DESCRIPTION = 'Profil uživatele ve webové aplikace SWAPni TO.';

/**
 * User page takes uid to display info -> this should be username in future
 */
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

const UserCreatedContent = ({ userId }: { userId: string }) => {
  const { status, data: offers } = useFetchAllOffersForUser({ userId });
  const signinCheck = useSigninCheck();

  if (status === 'loading') return <Spinner />;
  if (signinCheck.status === 'loading') return <Spinner />;

  if (status === 'error') return null;
  if (signinCheck.error) return null;

  return (
    <>
      {offers.map((offer, i) => (
        <BookOfferCard
          key={i}
          offer={offer}
          userUID={signinCheck.data.user?.uid}
        />
      ))}
    </>
  );
};

const BookOfferCard = ({
  offer,
  userUID,
}: {
  offer: BookOffer;
  userUID: string | undefined;
}) => {
  return <OfferCard offer={offer} userUID={userUID} />;
};

const UserDescription = ({ userId }: { userId: string }) => {
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

export default User;
