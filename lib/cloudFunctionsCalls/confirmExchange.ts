import { Functions, httpsCallable } from 'firebase/functions';

const confirmExchange = async (functions: Functions, chatId: string) => {
  const acceptExchangeOfferCall = httpsCallable(functions, 'confirmExchange');

  return acceptExchangeOfferCall({
    chatId: chatId,
  });
};

export { confirmExchange };
