import { createBookOffer } from '@/lib/cloudFunctionsCalls/createBookOffer';
import { BookOffer } from '@/lib/types/BookOffer';
import { BookState } from '@/lib/types/BookState';
import { Button, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useFunctions, useUser } from 'reactfire';
import { ModalContainer } from '../modals/ModalContainer';
import { FormFieldSelect, FormFieldTextArea } from './FormField';

const bookStateOptions: Array<{ value: BookState; description: string }> = [
  { value: 'Jako nová', description: 'Jako nová' },
  { value: 'Mírně poškozená', description: 'Mírně poškozená' },
  { value: 'Používaná', description: 'Používaná' },
  { value: 'Velmi poškozená', description: 'Velmi poškozená' },
];

const AddBookOfferForm = ({
  bookId,
  bookTitle,
}: {
  bookId: string;
  bookTitle: string;
}) => {
  const { data: user } = useUser();
  const toast = useToast();
  const functions = useFunctions();
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);

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

    setButtonLoading(true);

    createBookOffer(functions, bookId, bookTitle, values)
      .then(
        () => {
          setButtonLoading(false);
          toast({
            title: 'Nabídka vytvořena.',
            description: 'Vaše nabídka byla úspěšně přidána.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        () => {
          setButtonLoading(false);
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se vytvořit nabídku.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .catch(() => {
        setButtonLoading(false);
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se vytvořit nabídku.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContainer
      modalButtonText={'Přidat nabídku'}
      modalHeaderText={'Přidat nabídku'}
      variant={'swapDarkOutline'}
    >
      <Formik
        initialValues={{ notes: '', bookState: 'Jako nová' }}
        onSubmit={addBookOfferSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <VStack gap={2} align={'start'}>
            <FormFieldTextArea name={'notes'} label={'Poznámky k nabídce'} />
            <FormFieldSelect
              name={'bookState'}
              label={'Stav knihy'}
              options={bookStateOptions}
            />
            <Button
              type={'submit'}
              colorScheme={'green'}
              isLoading={isButtonLoading}
            >
              Přidat nabídku
            </Button>
          </VStack>
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { AddBookOfferForm };
