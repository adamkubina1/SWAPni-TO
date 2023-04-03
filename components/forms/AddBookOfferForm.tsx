import { createBookOffer } from '@/lib/createBookOffer';
import { BookOffer } from '@/lib/types/BookOffer';
import { BookState } from '@/lib/types/BookState';
import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useFirestore, useUser } from 'reactfire';
import { ModalContainer } from '../modals/ModalContainer';
import { FormFieldSelect, FormFieldTextArea } from './FormField';

const bookStateOptions: Array<{ value: BookState; description: string }> = [
  { value: 'Jako nová', description: 'Jako nová' },
  { value: 'Mírně poškozená', description: 'Mírně poškozená' },
  { value: 'Používaná', description: 'Používaná' },
  { value: 'Velmi poškozená', description: 'Velmi poškozená' },
];

const AddBookOfferForm = ({ bookId }: { bookId: string }) => {
  const fireStore = useFirestore();
  const { data: user } = useUser();
  const toast = useToast();

  const addBookOfferSubmit = async (values: BookOffer) => {
    if (!user) {
      toast({
        title: 'Jejda něco se pokazilo.',
        description: 'Nepodařilo se přidat novou nabídku.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    createBookOffer(user.uid, bookId, fireStore, {
      notes: values.notes,
      bookState: values.bookState,
    }).then(
      () => {
        toast({
          title: 'Nabídka vytvořena.',
          description: 'Vaše nabídka byla úspěšně přidána.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se vytvořit nabídku.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <ModalContainer
      modalButtonText={'Přidat nabídku'}
      modalHeaderText={'Přidat nabídku'}
    >
      <Formik
        initialValues={{ notes: '', bookState: 'Jako nová' }}
        onSubmit={addBookOfferSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <FormFieldTextArea name={'notes'} label={'Poznámky k nabídce'} />
          <FormFieldSelect
            name={'bookState'}
            label={'Stav knihy'}
            options={bookStateOptions}
          />
          <Button variant={'swapLightOutline'} type={'submit'}>
            Přidat nabídku
          </Button>
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { AddBookOfferForm };
