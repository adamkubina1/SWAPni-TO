import { createUserReview } from '@/lib/createUserReview';
import { ValidateStars } from '@/lib/formValidators';
import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
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

  const onSubmitForm = async (values: { stars: number; review: string }) => {
    if (!user) {
      toast({
        title: 'Jejda něco se pokazilo.',
        description: 'Nepodařilo se aktualizovat váš profil.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    await createUserReview(
      firestore,
      reviewedUserId,
      user.uid,
      values.review,
      values.stars
    )
      .then(
        () => {
          toast({
            title: 'Profil byl aktualizován.',
            description: 'Vaše uživatelské jméno bylo úspěšně aktualizováno.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        () => {
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se aktualizovat váš profil.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .catch(() => {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se aktualizovat váš profil.',
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
    >
      <Formik
        initialValues={{ stars: 5, review: '' }}
        onSubmit={onSubmitForm}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
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

          <Button type={'submit'} variant={'swapLightOutline'} mt={2}>
            Přidat recenzi!
          </Button>
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { AddUserReview };
