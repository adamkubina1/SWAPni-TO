import { Validator } from '@/lib/formValidators';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
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
const FormField = ({
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

export { FormField };
