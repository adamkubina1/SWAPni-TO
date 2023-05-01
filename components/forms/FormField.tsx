import { useFetchBook } from '@/lib/customHooks/googleBooksHooks/useFetchBook';
import { Validator } from '@/lib/formValidators';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { ReactNode } from 'react';

/**
 *
 * @param name String id for the field in the form.
 * @param type Optional string defining type of input, must be legit HTML input type, defaults to 'text'.
 * @param validate Function validating value of the field, reference in /lib/formValidators.ts.
 * @param label Optional text on top of the input.
 * @param placeholder Optional text inside of the input.
 * @param leftAddon Optional component on the left side of input, need to be based on <InputLeftAddon /> from Chakra UI.
 * @param rightAddon Optional component on the right side of input, need to be based on <InputRightAddon /> from Chakra UI.
 */
const FormFieldInput = ({
  name,
  type = 'text',
  validate,
  label,
  placeholder,
  leftAddon,
  rightAddon,
}: {
  name: string;
  type?: string;
  validate?: Validator;
  label?: string;
  placeholder?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name]}>
          <FormLabel mt={2}>{label}</FormLabel>
          <InputGroup>
            {leftAddon}
            <Input
              {...field}
              backgroundColor={'swap.lightBase'}
              color={'swap.lightText'}
              borderColor={'gray.400'}
              _placeholder={{
                color: 'gray.400',
              }}
              placeholder={placeholder}
              type={type}
            />
            {rightAddon}
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

/**
 *
 * @param name String id for the field in the form.
 * @param validate Function validating value of the field, reference in /lib/formValidators.ts.
 * @param label Optional text on top of the input.
 * @param placeholder Optional text inside of the input.
 */
const FormFieldTextArea = ({
  name,
  validate,
  label,
  placeholder,
}: {
  name: string;
  type?: string;
  validate?: Validator;
  label?: string;
  placeholder?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name]}>
          <FormLabel mt={2}>{label}</FormLabel>
          <Textarea
            {...field}
            backgroundColor={'swap.lightBase'}
            color={'swap.lightText'}
            borderColor={'gray.400'}
            _placeholder={{
              color: 'gray.400',
            }}
            placeholder={placeholder}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

/**
 *
 * @param name String id for the field in the form.
 * @param validate Function validating value of the field, reference in /lib/formValidators.ts.
 * @param label Optional text on top of the input.

 */
const FormFieldInputFile = ({
  name,
  validate,
  label,
}: {
  name: string;
  validate?: Validator;
  label?: string;
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name]}>
          <FormLabel mt={2}>{label}</FormLabel>
          <InputGroup>
            <Input
              {...field}
              value={undefined} //Will crash without this
              backgroundColor={'swap.lightBase'}
              pl={0}
              color={'swap.lightText'}
              type={'file'}
              onChange={(event) => {
                if (event.currentTarget.files)
                  form.setFieldValue(name, event.currentTarget.files[0]);
              }}
            />
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

/**
 *
 * @param name String id for the field in the form.
 * @param validate Function validating value of the field, reference in /lib/formValidators.ts.
 * @param label Optional text on top of the input.

 */
const FormFieldSelect = ({
  name,
  validate,
  label,
  placeholder,
  options,
}: {
  name: string;
  validate?: Validator;
  label?: string;
  placeholder?: string;
  options: Array<{ value: any; description: string }>;
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name]}>
          <FormLabel mt={2}>{label}</FormLabel>
          <Select
            name={name}
            placeholder={placeholder}
            onChange={form.handleChange}
          >
            {options.map((option, i) => (
              <option id={name} key={i} value={option.value}>
                {option.description}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

/**
 *
 * @param name String id for the field in the form.
 * @param validate Function validating value of the field, reference in /lib/formValidators.ts.
 * @param label Optional text on top of the input.

 */
const FormFieldSelectWithBook = ({
  name,
  validate,
  label,
  placeholder,
  options,
}: {
  name: string;
  validate?: Validator;
  label?: string;
  placeholder?: string;
  options: Array<{ value: any; description: string }>;
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name]}>
          <FormLabel mt={2}>{label}</FormLabel>
          <Select
            name={name}
            placeholder={placeholder}
            onChange={form.handleChange}
          >
            <option
              id={name}
              value={JSON.stringify({
                bookState: 'Jako nová',
                notes: '',
                id: null,
              })}
            >
              Bez protinabídky
            </option>

            {options.map((option, i) => (
              <BookOption
                name={name}
                key={i}
                value={JSON.stringify(option.value)}
                descriptionEnding={option.description}
                bookId={option.value.bookId}
              />
            ))}
          </Select>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const BookOption = ({
  name,
  value,
  descriptionEnding,
  bookId,
}: {
  name: string;
  value: any;
  descriptionEnding: string;
  bookId: string;
}) => {
  const { data, error, isLoading } = useFetchBook(bookId);

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Text color={'red'}>Něco se pokazilo...</Text>;
  }
  const bookData: GoogleBookApiBook = data;

  return (
    <option id={name} value={value}>
      {bookData.volumeInfo.title + ' - ' + descriptionEnding}
    </option>
  );
};

export {
  FormFieldInput,
  FormFieldTextArea,
  FormFieldInputFile,
  FormFieldSelect,
  FormFieldSelectWithBook,
};
