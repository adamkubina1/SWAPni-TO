import { createUserReview } from '@/lib/createUserReview';
import { ValidateStars } from '@/lib/formValidators';
import { Button, useToast, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useFirestore, useUser } from 'reactfire';
import { ModalContainer } from '../modals/ModalContainer';
import { FormFieldSelect, FormFieldTextArea } from './FormField';

const starOptions = [
  { value: 5, description: '5' },
  { value: 4, description: '4' },
  { value: 3, description: '3' },
  { value: 2, description: '2' },
  { value: 1, description: '1' },
];

const AddUserReview = ({ reviewedUserId }: { reviewedUserId: string }) => {
  const firestore = useFirestore();
  const { data: user } = useUser();
  const toast = useToast();
  const [isButtonLoading, setButtonLoading] = useState<boolean>(false);

  const onSubmitForm = async (values: { stars: number; review: string }) => {
    if (!user) {
      toast({
        title: 'Jejda něco se pokazilo.',
        description: 'Nepodařilo se přidat recenzi.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setButtonLoading(true);

    await createUserReview(
      firestore,
      reviewedUserId,
      user.uid,
      values.review,
      values.stars
    )
      .then(
        () => {
          setButtonLoading(false);
          toast({
            title: 'Recenze vytvořena.',
            description:
              'Byla úspěšně přidána vaše recenze na tohoto uživatele',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        () => {
          setButtonLoading(false);
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se přidat recenzi.',
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
          description: 'Nepodařilo se přidat recenzi.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContainer
      modalButtonText={'Ohodnotit uživatele'}
      modalHeaderText={'Ohodnotit uživatele'}
      variant={'swapDarkOutline'}
    >
      <Formik
        initialValues={{ stars: 5, review: '' }}
        onSubmit={onSubmitForm}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <VStack align={'start'} gap={2}>
            <FormFieldSelect
              name={'stars'}
              label={'Počet hvězd'}
              options={starOptions}
              validate={ValidateStars}
            />
            <FormFieldTextArea
              name={'review'}
              label={'Slovní hodnocení'}
              placeholder={'Vaše zkušenost s uživatelem'}
            />

            <Button
              type={'submit'}
              mt={2}
              variant={'swapLightOutline'}
              isLoading={isButtonLoading}
            >
              Přidat recenzi!
            </Button>
          </VStack>
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { AddUserReview };
