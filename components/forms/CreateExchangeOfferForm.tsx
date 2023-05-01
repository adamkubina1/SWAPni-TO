import { createExchangeOffer } from '@/lib/cloudFunctionsCalls/createExchangeOffer';
import { useFetchAllOffersForUser } from '@/lib/customHooks/firestoreHooks/useFetchAllOffers';
import { BookOffer } from '@/lib/types/BookOffer';
import { Button, Spinner, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
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
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);
  const toast = useToast();
  const functions = useFunctions();
  const { status, data: possibleCounterOffers } = useFetchAllOffersForUser(
    user?.uid
  );

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
    counterOffer: any;
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

    setButtonLoading(true);

    const newCounter = JSON.parse(values.counterOffer);

    createExchangeOffer(
      functions,
      bookOfferId,
      newCounter?.id ? newCounter.id : null,
      receiverUserId,
      bookId,
      bookOffer,
      values.message,
      newCounter
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
          setButtonLoading(false);
        },
        () => {
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se vytvořit žádost.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setButtonLoading(false);
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
        setButtonLoading(false);
      });
  };

  return (
    <ModalContainer
      modalButtonText={'Požádat o výměnu'}
      modalHeaderText={'Vytvořit žádost o výměnu'}
      variant={'swapLightSolid'}
    >
      <Formik
        initialValues={{
          message: 'Rád/a bych s vámi vyměnil/a tuto knihu.',
          counterOffer: JSON.stringify({
            bookState: 'Jako nová',
            notes: '',
            id: null,
          }),
        }}
        onSubmit={addBookOfferSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          {status === 'loading' ? (
            <Spinner />
          ) : (
            <VStack gap={2} align={'start'}>
              <FormFieldTextArea name={'message'} label={'Zpráva k žádosti'} />
              <FormFieldSelectWithBook
                name={'counterOffer'}
                label={'Protinabídka'}
                options={options}
              />
              <Button
                variant={'swapLightOutline'}
                type={'submit'}
                loadingText={'Vytváříme'}
                isLoading={isButtonLoading}
              >
                Požádat o výměnu
              </Button>
            </VStack>
          )}
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { CreateExchangeOfferForm };
