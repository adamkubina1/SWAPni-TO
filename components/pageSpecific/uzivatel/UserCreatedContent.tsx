import { OfferCard } from '@/components/generic/OfferCard';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { Spinner } from '@chakra-ui/react';
import { useSigninCheck } from 'reactfire';

export const UserCreatedContent = ({ userId }: { userId: string }) => {
  const { status, data: offers } = useFetchAllOffersForUser(userId);
  const signinCheck = useSigninCheck();

  if (status === 'loading') return <Spinner />;
  if (signinCheck.status === 'loading') return <Spinner />;

  if (status === 'error') return null;
  if (signinCheck.error) return null;

  return (
    <>
      {offers.map((offer, i) => (
        <OfferCard key={i} offer={offer} userUID={signinCheck.data.user?.uid} />
      ))}
    </>
  );
};
