import { ValidateSearch } from '@/lib/formValidators';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  InputRightAddon,
  Tooltip,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { MdSearch } from 'react-icons/md';
import { FormFieldInput } from './FormField';

const SearchForm = ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const onSubmitForm = async (values: { search: string }) => {
    setSearch(values.search);
  };

  return (
    <Formik
      initialValues={{ search: '', searchType: 'searchBookName' }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <Box w={'100%'}>
          <HStack align={'center'}>
            <FormFieldInput
              name={'search'}
              validate={ValidateSearch}
              label={''}
              type={'search'}
              placeholder={'Vyhledat'}
              rightAddon={
                <InputRightAddon
                  px={0}
                  backgroundColor={'swap.lightHighlight'}
                  borderColor={'swap.lightHighlight'}
                >
                  <Button
                    type={'submit'}
                    color={'swap.darkHighlight'}
                    backgroundColor={'swap.lightHighlight'}
                    borderColor={'swap.lightHighlight'}
                  >
                    <MdSearch />
                  </Button>
                </InputRightAddon>
              }
            />
            <Box pt={1}>
              <Tooltip label={'Při vyhledávání použijte interpunkci'}>
                <InfoIcon w={5} h={5} />
              </Tooltip>
            </Box>
          </HStack>
        </Box>
      </Form>
    </Formik>
  );
};

export { SearchForm };
