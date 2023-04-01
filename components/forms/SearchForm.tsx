import { ValidateSearch } from '@/lib/formValidators';
import { SearchType } from '@/lib/types/Search';
import { Box, Button, InputRightAddon, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { MdSearch } from 'react-icons/md';
import { FormFieldInput, FormFieldSelect } from './FormField';

const searchOptions: Array<{ value: SearchType; description: string }> = [
  { value: 'searchBookName', description: 'Knihu název/ISBN' },
  { value: 'searchUser', description: 'Uživatele' },
];

const SearchForm = ({
  setSearch,
  setSearchType,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}) => {
  const onSubmitForm = async (values: {
    search: string;
    searchType: string;
  }) => {
    switch (values.searchType) {
      case 'searchBookName':
        setSearch(values.search);
        setSearchType('searchBookName');
        break;
      case 'searchUser':
        setSearch(values.search);
        setSearchType('searchUser');
        break;
    }
  };

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
