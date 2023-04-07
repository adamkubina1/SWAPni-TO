import { createExchangeOffer } from '@/lib/cloudFunctionsCalls/createExchangeOffer';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { BookOffer } from '@/lib/types/BookOffer';
import { Button, Spinner, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useFunctions, useUser } from 'reactfire';
import { ModalContainer } from '../modals/ModalContainer';
import { FormFieldSelectWithBook, FormFieldTextArea } from './FormField';

const CreateExchangeOfferForm = ({
  bookOfferId,
  bookId,
  receiverUserId,
  bookOffer,
}: {
  bookOfferId: string;
  bookId: string;
  receiverUserId: string;
  bookOffer: BookOffer;
}) => {
  const { data: user } = useUser();
  const toast = useToast();
  const functions = useFunctions();
  const { status, data } = useFetchAllOffersForUser({
    userId: user?.uid,
  });

  const possibleCounterOffers = data as Array<BookOffer & { id: string }>;
  let options: Array<{
    value: BookOffer & { id: string | null };
    description: string;
  }> = Array();

  possibleCounterOffers?.map((offer, i) => {
    options.push({
      value: offer,
      description: offer.bookState,
    });
  });

  const addBookOfferSubmit = async (values: {
    message: string;
    counterOffer: string;
  }) => {
    if (!user) {
      toast({
        title: 'Jejda něco se pokazilo.',
        description: 'Nepodařilo se přidat novou žádost.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const counterOffer: BookOffer & { id: string | null } = JSON.parse(
      values.counterOffer
    );

    createExchangeOffer(
      functions,
      bookOfferId,
      counterOffer?.id ? counterOffer.id : null,
      receiverUserId,
      bookId,
      bookOffer,
      values.message,
      {
        bookState: counterOffer?.bookState
          ? counterOffer?.bookState
          : 'Jako nová',
        notes: counterOffer?.notes ? counterOffer?.notes : '',
        bookId: counterOffer?.bookId ? counterOffer.bookId : '',
      }
    )
      .then(
        () => {
          toast({
            title: 'Žádost vytvořena.',
            description: 'Vaše žádost byla úspěšně přidána.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        () => {
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se vytvořit žádost.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .catch(() => {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se vytvořit žádost.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContainer
      modalButtonText={'Vytvořit žádost'}
      modalHeaderText={'Vytvořit žádost o výměnu'}
    >
      <Formik
        initialValues={{
          message: 'Rád/a bych s vámi vyměnil/a tuto knihu.',
          counterOffer: "{ bookState: 'Jako nová', notes: '', id: null }",
        }}
        onSubmit={addBookOfferSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          {status === 'loading' ? (
            <Spinner />
          ) : (
            <>
              <FormFieldTextArea name={'message'} label={'Zpráva k žádosti'} />
              <FormFieldSelectWithBook
                name={'counterOffer'}
                label={'Protinabídka'}
                options={options}
              />
              <Button variant={'swapLightOutline'} type={'submit'}>
                Přidat nabídku
              </Button>
            </>
          )}
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { CreateExchangeOfferForm };
