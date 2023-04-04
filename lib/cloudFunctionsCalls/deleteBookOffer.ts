import { Functions, httpsCallable } from "firebase/functions";

const deleteBookOffer = async (
    functions: Functions,
    bookOfferId: string,
    bookId: string,
  ) => {
    const deleteBookOfferCall = httpsCallable(functions, 'deleteBookOffer');
  
    return deleteBookOfferCall({ bookOfferId: bookOfferId, bookId: bookId });
  };

  export { deleteBookOffer };

