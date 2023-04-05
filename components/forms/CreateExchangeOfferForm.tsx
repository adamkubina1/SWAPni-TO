import {createExchangeOffer} from "@/lib/cloudFunctionsCalls/createExchangeOffer";
import {BookOffer} from "@/lib/types/BookOffer";
import {Button, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {useFunctions, useUser} from "reactfire";
import {ModalContainer} from "../modals/ModalContainer";
import {FormFieldTextArea} from "./FormField";

const CreateExchangeOfferForm
 = ({ bookOfferId, bookId, receiverUserId, bookOffer }: { bookOfferId: string, bookId:string, receiverUserId: string, bookOffer: BookOffer }) => {
    const { data: user } = useUser();
    const toast = useToast();
    const functions = useFunctions();
  
    const addBookOfferSubmit = async (values: {message: string}) => {
      if (!user) {
        toast({
          title: 'Jejda něco se pokazilo.',
          description: 'Nepodařilo se přidat novou žádost.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      createExchangeOffer(functions, bookOfferId, receiverUserId, bookId, bookOffer, values.message, )
        .then(
          () => {
            toast({
              title: 'Žádost vytvořena.',
              description: 'Vaše žádost byla úspěšně přidána.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          },
          () => {
            toast({
              title: 'Jejda něco se pokazilo.',
              description: 'Nepodařilo se vytvořit žádost.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        )
        .catch(() => {
          toast({
            title: 'Jejda něco se pokazilo.',
            description: 'Nepodařilo se vytvořit žádost.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    };
  
    return (
      <ModalContainer
        modalButtonText={'Vytvořit žádost'}
        modalHeaderText={'Vytvořit žádost o výměnu'}
      >
        <Formik
          initialValues={{ message: '' }}
          onSubmit={addBookOfferSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          <Form>
            <FormFieldTextArea name={'message'} label={'Zpráva k žádosti'} />
            <Button variant={'swapLightOutline'} type={'submit'}>
              Přidat nabídku
            </Button>
          </Form>
        </Formik>
      </ModalContainer>
    );
  };
  
  export {CreateExchangeOfferForm};

