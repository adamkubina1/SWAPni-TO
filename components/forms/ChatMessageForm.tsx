import { createMessage } from '@/lib/firestoreCalls/createMessage';
import { ValidateMessage } from '@/lib/formValidators';
import { Button, HStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useFirestore } from 'reactfire';
import { FormFieldInput } from './FormField';

const ChatMessageForm = ({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) => {
  const fireStore = useFirestore();

  const onSubmitForm = async (
    values: { message: string },
    { resetForm }: any
  ) => {
    await createMessage(fireStore, chatId, userId, values.message).then(() => {
      resetForm({});
    });
  };

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={onSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <Form>
        <HStack align={'end'}>
          <FormFieldInput
            name={'message'}
            validate={ValidateMessage}
            placeholder={'Zpráva'}
          />

          <Button type={'submit'} variant={'swapLightSolid'} mt={2}>
            Odeslat!
          </Button>
        </HStack>
      </Form>
    </Formik>
  );
};

export { ChatMessageForm };
