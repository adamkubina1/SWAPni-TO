import { ValidateSearch } from '@/lib/formValidators';
import { Box, Button, InputRightAddon, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { MdSearch } from 'react-icons/md';
import { FormFieldInput, FormFieldSelect } from './FormField';

const searchOptions: Array<{ value: string; description: string }> = [
  { value: 'searchBookName', description: 'Knihu z názvu' },
  { value: 'searchUser', description: 'Uživatele' },
];

const SearchForm = () => {
  const onSubmitForm = async (values: {
    search: string;
    searchType: string;
  }) => {};

  return (
    <Formik
      initialValues={{ search: '', searchType: 'searchBookName' }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Box w={'100%'}>
            <FormFieldInput
              name={'search'}
              validate={ValidateSearch}
              label={''}
              type={'search'}
              placeholder={'Vyhledat'}
              rightAddon={
                <InputRightAddon px={0}>
                  <Button type={'submit'} color={'swap.darkHighlight'}>
                    <MdSearch />
                  </Button>
                </InputRightAddon>
              }
            />
          </Box>
          <Box minW={'max-content'} color={'swap.lightHighlight'}>
            <FormFieldSelect name={'searchType'} options={searchOptions} />
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
};

export { SearchForm };
