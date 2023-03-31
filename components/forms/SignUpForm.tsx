import { useSignUpWithPass } from '@/lib/customHooks/useSignUpWithPass';
import { ValidateEmail, ValidatePasswordSignUp } from '@/lib/formValidators';
import { Button } from '@chakra-ui/button';
import { InputLeftAddon } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { ReactNode, useEffect } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GoogleSignButton } from '../GoogleSignButton';
import { FormFieldInput } from './FormField';

const SignUpContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={6} boxShadow={'dark-lg'} borderRadius={'lg'}>
      {children}
    </Box>
  );
};

const SignUpForm = ({ onSignUp }: { onSignUp: () => void }) => {
  const [signUp, state] = useSignUpWithPass();
  const loading = state.loading;
  const firebaseSignUpError = state.error;

  useEffect(() => {
    if (state.success) {
      onSignUp();
    }
  }, [onSignUp, state.success]);

  const signPasswordSubmit = (
    values: {
      email: string;
      password: string;
      passwordRepeat: string;
    },
    actions: any
  ) => {
    if (values.password !== values.passwordRepeat) {
      actions.setErrors({ passwordRepeat: 'Hesla se musí shodovat' });
      return;
    }
    if (loading) {
      return;
    }

    signUp(values.email, values.password);
  };

  return (
    <SignUpContainer>
      <Formik
        initialValues={{ email: '', password: '', passwordRepeat: '' }}
        onSubmit={signPasswordSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <FormFieldInput
            name={'email'}
            type={'text'} //Browsers are annoying with type email to users
            validate={ValidateEmail}
            label={'Email'}
            placeholder={'Vaše emailová adresa'}
            leftAddon={
              <InputLeftAddon>
                <MdAlternateEmail />
              </InputLeftAddon>
            }
          />
          <FormFieldInput
            name={'password'}
            type={'password'}
            validate={ValidatePasswordSignUp}
            label={'Heslo'}
            placeholder={'Vaše heslo'}
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
            <Button w={'100%'} type={'submit'} variant={'swapLightSolid'}>
              Vytvořit nový účet
            </Button>
            {firebaseSignUpError ? (
              <Text fontSize={'xs'} color={'red.300'}>
                {firebaseSignUpError.message}
              </Text>
            ) : null}
            <GoogleSignButton onSignIn={onSignUp} />
          </Flex>
        </Form>
      </Formik>
      <NextLink href={'/prihlaseni'}>
        <Text pt={4} fontSize={'xs'} textAlign={'center'}>
          Pokud již máte účet přihlaste se!
        </Text>
      </NextLink>
    </SignUpContainer>
  );
};

export { SignUpForm };
