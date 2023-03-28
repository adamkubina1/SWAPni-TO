import { FormField } from '@/components/forms/FormField';
import { Seo } from '@/components/Seo';
import { useAuth } from '@/context/AuthUserContext';
import { useNonAuthProtectedRoute } from '@/lib/customReactHooks';
import { ValidateEmail, ValidatePasswordSignUp } from '@/lib/formValidators';
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
import { ReactNode } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const PAGE_TITLE = 'Registrace';
const PAGE_DESCRIPTION = 'Registrace nového účtu do webové aplikace SWAPni TO.';

const Registrace = () => {
  useNonAuthProtectedRoute();

  return (
    <>
      <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      <VStack
        pt={{ base: '10vh', md: '10vh' }}
        justifyContent={'center'}
        gap={10}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>Registrace</Heading>
        <SignUpContainer>
          <SignUpForm />
          <NextLink href={'/prihlaseni'}>
            <Text pt={4} fontSize={'xs'} textAlign={'center'}>
              Pokud již máte účet přihlaste se!
            </Text>
          </NextLink>
        </SignUpContainer>
      </VStack>
    </>
  );
};

const SignUpContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box p={6} boxShadow={'dark-lg'} borderRadius={'lg'}>
      {children}
    </Box>
  );
};

const SignUpForm = () => {
  const { signInGoogle, createUserPassword } = useAuth();
  const router = useRouter();

  const signGoogleClick = () => {
    signInGoogle()
      .then(() => router.push('/'))
      .catch((e) => {});
  };

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

    createUserPassword(values.email, values.password)
      .then(() => router.push('/'))
      .catch((e) => {});
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', passwordRepeat: '' }}
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
          validate={ValidatePasswordSignUp}
          label={'Heslo'}
          placeholder={'Vaše heslo'}
          leftAddon={
            <InputLeftAddon>
              <RiLockPasswordLine />
            </InputLeftAddon>
          }
        />
        <FormField
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
          <Button
            w={'100%'}
            mt={8}
            onClick={signGoogleClick}
            variant={'swapLightSolid'}
            leftIcon={<FaGoogle color={'#4285F4'} />}
          >
            Registrace Google
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Registrace;
