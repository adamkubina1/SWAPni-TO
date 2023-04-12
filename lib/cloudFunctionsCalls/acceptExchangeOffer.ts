import { Functions, httpsCallable } from 'firebase/functions';

const acceptExchangeOffer = async (
  functions: Functions,
  exchangeOfferId: string
) => {
  const acceptExchangeOfferCall = httpsCallable(
    functions,
    'acceptExchangeOffer'
  );

  return acceptExchangeOfferCall({
    exchangeOfferId: exchangeOfferId,
  });
};

export { acceptExchangeOffer };
