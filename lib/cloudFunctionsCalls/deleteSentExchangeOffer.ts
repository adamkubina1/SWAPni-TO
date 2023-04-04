import { Functions, httpsCallable } from 'firebase/functions';

const deleteSentExchangeOffer = async (
  functions: Functions,
  sentExchangeOfferId: string,
  targetUserId: string,
) => {
  const deleteSentExchangeOfferCall = httpsCallable(functions, 'deleteSentExchangeOffer');

  return deleteSentExchangeOfferCall({ sentExchangeOfferId: sentExchangeOfferId, targetUserId: targetUserId });
};

export { deleteSentExchangeOffer };

