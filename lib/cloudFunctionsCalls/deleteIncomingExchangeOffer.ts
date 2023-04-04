import { Functions, httpsCallable } from 'firebase/functions';

const deleteIncomingExchangeOffer = async (
  functions: Functions,
  incomingExchangeOfferId: string,
  sendingExchangeOfferId: string,
) => {
  const deleteIncomingExchangeOfferCall = httpsCallable(functions, 'deleteIncomingExchangeOffer');

  return deleteIncomingExchangeOfferCall({ incomingExchangeOfferId: incomingExchangeOfferId, sendingExchangeOfferId: sendingExchangeOfferId });
};

export { deleteIncomingExchangeOffer };

