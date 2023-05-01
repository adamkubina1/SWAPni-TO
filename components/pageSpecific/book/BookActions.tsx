import { AddBookOfferForm } from '@/components/forms/AddBookOfferForm';
import NoSSR from '@/components/generic/NoSSR';
import { createBookDemand } from '@/lib/cloudFunctionsCalls/createBookDemand';
import { Button, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
import { useFunctions, useSigninCheck } from 'reactfire';

export const BookActions = ({
  bookId,
  bookTitle,
}: {
  bookId: string;
  bookTitle: string;
}) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const functions = useFunctions();
  const toast = useToast();

  return (
    <NoSSR>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 2, md: 0 }}
        >
          {signInCheckResult.signedIn ? (
            <>
              <AddBookOfferForm bookId={bookId} bookTitle={bookTitle} />
              <Button
                size={'sm'}
                variant={'swapDarkOutline'}
                onClick={() =>
                  createBookDemand(functions, bookId, bookTitle)
                    .then(() => {
                      toast({
                        title: 'Poptávka vytvořena.',
                        description:
                          'Při přidání nových nabídek k této knize budete nyní dostávat emailová upozornění.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                    .catch(() => {
                      toast({
                        title: 'Tuto knihu již poptáváte.',
                        description: 'Duplikovaná poptávka.',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                      });
                    })
                }
              >
                Přidat poptávku
              </Button>
            </>
          ) : (
            <Text color={'swap.darkHighlight'} fontSize={'xl'}>
              Přihlašte se pro přidání nabídek a poptávek na tuto knihu!
            </Text>
          )}
        </Stack>
      )}
    </NoSSR>
  );
};
