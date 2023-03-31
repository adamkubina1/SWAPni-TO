import { ValidateProfilePic } from '@/lib/formValidators';
import { Button, useToast } from '@chakra-ui/react';
import { ref, uploadBytes } from 'firebase/storage';
import { Form, Formik } from 'formik';
import { useStorage, useUser } from 'reactfire';
import { FormFieldInputFile } from './FormField';

const EditProfilePicForm = () => {
  const storage = useStorage();
  const { data: user } = useUser();
  const toast = useToast();

  const onSubmitForm = async (values: { newProfileImg: any }) => {
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

    const imgRef = ref(storage, `userAvatars/${user.uid}`);

    await uploadBytes(imgRef, values.newProfileImg).then(
      () => {
        toast({
          title: 'Profil byl aktualizován.',
          description:
            'Váš profilový obrázek byl úspěšně aktualizován. Znovu načtěte stránku pro aplikaci změn.',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se aktualizovat váš profilový obrázek.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <Formik
      initialValues={{ newProfileImg: undefined }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <FormFieldInputFile
          name={'newProfileImg'}
          validate={ValidateProfilePic}
          label={'Profilový obrázek'}
        />

        <Button type={'submit'} variant={'swapLightOutline'} mt={2}>
          Změnit profilový obrázek!
        </Button>
      </Form>
    </Formik>
  );
};

export { EditProfilePicForm };
