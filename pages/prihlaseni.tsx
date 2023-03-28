import { FormField } from '@/components/forms/FormField';
import { Seo } from '@/components/Seo';
import { useAuth } from '@/context/AuthUserContext';
import { useNonAuthProtectedRoute } from '@/lib/customReactHooks';
import { ValidateEmail, ValidatePasswordLogin } from '@/lib/formValidators';
import {
  Box,
  Button,
  Flex,
  Heading,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const PAGE_TITLE = 'Přihlášení';
const PAGE_DESCRIPTION = 'Přihlášení do webové aplikace SWAPni TO.';

const Prihlaseni = () => {
  useNonAuthProtectedRoute();

  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Přihlášení</Heading>
        <LoginContainer>
          <LoginForm />
          <NextLink href={'/registrace'}>
            <Text pt={4} fontSize={'xs'} textAlign={'center'}>
              Pokud nemáte účet zaregistrujte se!
            </Text>
          </NextLink>
        </LoginContainer>
      </VStack>
    </>
  );
};

const LoginContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={6} boxShadow={'dark-lg'} borderRadius={'lg'}>
      {children}
    </Box>
  );
};

/**
 * Handling any firebase error from password sign in as it was wrong credentials
 *
 */
const LoginForm = () => {
  const [isFirebaseError, setFirabaseError] = useState<boolean>(false);
  const { signInGoogle, signInPassword } = useAuth();
  const router = useRouter();

  const signGoogleClick = () => {
    signInGoogle()
      .then(() => router.push('/'))
      .catch((e) => {});
  };

  const signPasswordSubmit = (values: { email: string; password: string }) => {
    setFirabaseError(false);

    signInPassword(values.email, values.password)
      .then(() => router.push('/'))
      .catch((e) => {
        setFirabaseError(true);
      });
  };

  return (
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
          {isFirebaseError ? (
            <Text fontSize={'xs'} color={'red.300'}>
              Přihlašovací údaje nejsou platné
            </Text>
          ) : (
            <></>
          )}
          <Button
            w={'100%'}
            mt={8}
            onClick={signGoogleClick}
            variant={'swapLightSolid'}
            leftIcon={<FaGoogle color={'#4285F4'} />}
          >
            Přihlášení Google
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Prihlaseni;
