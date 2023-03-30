import { useSignInWithPass } from '@/lib/customHooks/useSignInWithPass';
import { ValidateEmail, ValidatePasswordLogin } from '@/lib/formValidators';
import { Button } from '@chakra-ui/button';
import { InputLeftAddon } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { ReactNode, useEffect } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GoogleSignButton } from '../GoogleSignButton';
import { FormField } from './FormField';

const LoginContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={6} boxShadow={'dark-lg'} borderRadius={'lg'}>
      {children}
    </Box>
  );
};

const LoginForm = ({ onSignIn }: { onSignIn: () => void }) => {
  const [signIn, state] = useSignInWithPass();
  const loading = state.loading;
  const firebaseSignInError = state.error;

  useEffect(() => {
    if (state.success) {
      onSignIn();
    }
  }, [onSignIn, state.success]);

  const signPasswordSubmit = (values: { email: string; password: string }) => {
    if (loading) {
      return;
    }

    signIn(values.email, values.password);
  };

  return (
    <LoginContainer>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={signPasswordSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <FormField
            name={'email'}
            type={'text'} //Browser are annoying with type email to users
            validate={ValidateEmail}
            label={'Email'}
            placeholder={'Vaše emailová adresa'}
            leftAddon={
              <InputLeftAddon>
                <MdAlternateEmail />
              </InputLeftAddon>
            }
          />
          <FormField
            name={'password'}
            type={'password'}
            validate={ValidatePasswordLogin}
            label={'Heslo'}
            placeholder={'Vaše heslo'}
            leftAddon={
              <InputLeftAddon>
                <RiLockPasswordLine />
              </InputLeftAddon>
            }
          />
          <Flex direction={'column'} mt={4}>
            <Button w={'100%'} type={'submit'} variant={'swapLightSolid'}>
              Přihlásit se
            </Button>
            {firebaseSignInError ? (
              <Text fontSize={'xs'} color={'red.300'}>
                {firebaseSignInError.message}
              </Text>
            ) : null}
            <GoogleSignButton onSignIn={onSignIn} />
          </Flex>
        </Form>
      </Formik>
      <NextLink href={'/registrace'}>
        <Text pt={4} fontSize={'xs'} textAlign={'center'}>
          Pokud nemáte účet zaregistrujte se!
        </Text>
      </NextLink>
    </LoginContainer>
  );
};

export { LoginForm };
