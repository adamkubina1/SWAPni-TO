import { ValidateProfileBio } from '@/lib/formValidators';
import { Button, useToast } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useFirestore, useUser } from 'reactfire';
import { FormFieldTextArea } from './FormField';

const EditProfileForm = () => {
  const fireStore = useFirestore();
  const { data: user } = useUser();
  const toast = useToast();

  const onSubmitForm = async (values: { bio: string }) => {
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
    await updateDoc(ref, { bio: values.bio }).then(
      () => {
        toast({
          title: 'Profil byl aktualizován.',
          description: 'Popis vašeho profilu byl úspěšně aktualizován.',
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
      initialValues={{ bio: '' }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FormFieldTextArea
          name={'bio'}
          validate={ValidateProfileBio}
          label={'Popis profilu'}
          placeholder={'Napište něco o sobě'}
        />

        <Button type={'submit'} variant={'swapLightOutline'} mt={2}>
          Změnit popis profilu!
        </Button>
      </Form>
    </Formik>
  );
};

export { EditProfileForm };
