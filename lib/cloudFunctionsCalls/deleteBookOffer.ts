import { Functions, httpsCallable } from "firebase/functions";

const deleteBookOffer = async (
    functions: Functions,
    bookOfferId: string,
    bookId: string,
  ) => {
    const createBookOfferPromise = httpsCallable(functions, 'deleteBookOffer');
  
    return createBookOfferPromise({ bookOfferId: bookOfferId, bookId: bookId });
  };

  export { deleteBookOffer };

