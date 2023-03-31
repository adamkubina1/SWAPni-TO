import { ValidateProfileUsername } from '@/lib/formValidators';
import { Button, useToast } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useFirestore, useUser } from 'reactfire';
import { FormFieldInput } from './FormField';

const EditUserNameForm = () => {
  const fireStore = useFirestore();
  const { data: user } = useUser();
  const toast = useToast();

  const onSubmitForm = async (values: { username: string }) => {
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

    const ref = doc(fireStore, 'users', user.uid);
    await updateDoc(ref, { userName: values.username }).then(
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
    );
  };

  return (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FormFieldInput
          name={'username'}
          validate={ValidateProfileUsername}
          label={'Uživatelské jméno'}
          placeholder={'Nové uživatelské jméno'}
        />

        <Button type={'submit'} variant={'swapLightOutline'} mt={2}>
          Změnit uživatelské jméno!
        </Button>
      </Form>
    </Formik>
  );
};

export { EditUserNameForm };
