import { ValidatePasswordSignUp } from '@/lib/formValidators';
import { Button, Flex, InputLeftAddon, useToast } from '@chakra-ui/react';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { Form, Formik } from 'formik';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ModalContainer } from '../modals/ModalContainer';
import { FormFieldInput } from './FormField';

const ChangePasswordForm = () => {
  const toast = useToast();

  const changePasswordSubmit = (
    values: {
      oldPassword: string;
      password: string;
      passwordRepeat: string;
    },
    actions: any
  ) => {
    if (values.password !== values.passwordRepeat) {
      actions.setErrors({ passwordRepeat: 'Hesla se musí shodovat' });
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) return;

    const credential = EmailAuthProvider.credential(
      user.email,
      values.oldPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, values.password).then(() => {
          toast({
            title: 'Profil byl aktualizován.',
            description: 'Vaše heslo bylo úspěšně aktualizováno.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        });
      })
      .catch((error) => {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Bylo zadano špatné heslo',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ModalContainer
      modalButtonText={'Změnit heslo'}
      modalHeaderText={'Změnit heslo'}
      variant={'swapDarkOutline'}
    >
      <Formik
        initialValues={{ oldPassword: '', password: '', passwordRepeat: '' }}
        onSubmit={changePasswordSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <FormFieldInput
            name={'oldPassword'}
            type={'password'}
            validate={ValidatePasswordSignUp}
            label={'Aktuální heslo'}
            placeholder={'Vaše heslo'}
            leftAddon={
              <InputLeftAddon>
                <RiLockPasswordLine />
              </InputLeftAddon>
            }
          />
          <FormFieldInput
            name={'password'}
            type={'password'}
            validate={ValidatePasswordSignUp}
            label={'Nové heslo'}
            placeholder={'Vaše nové heslo'}
            leftAddon={
              <InputLeftAddon>
                <RiLockPasswordLine />
              </InputLeftAddon>
            }
          />
          <FormFieldInput
            name={'passwordRepeat'}
            type={'password'}
            validate={ValidatePasswordSignUp}
            label={'Kontrola hesla'}
            placeholder={'Vaše heslo znovu'}
            leftAddon={
              <InputLeftAddon>
                <RiLockPasswordLine />
              </InputLeftAddon>
            }
          />
          <Flex direction={'column'} mt={4}>
            <Button w={'100%'} type={'submit'} variant={'swapLightOutline'}>
              Změnit heslo
            </Button>
          </Flex>
        </Form>
      </Formik>
    </ModalContainer>
  );
};

export { ChangePasswordForm };
