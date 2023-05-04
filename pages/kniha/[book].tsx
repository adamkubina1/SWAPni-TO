import { BookInfo } from '@/components/pageSpecific/book/BookInfo';
import { BookRelatedContent } from '@/components/pageSpecific/book/BookRelatedContent';
import { Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Book = () => {
  const router = useRouter();
  let { book } = router.query;
  if (Array.isArray(book)) {
    book = book[0];
  }

  if (!book) {
    return (
      <Text color={'red'} pt={28}>
        Něco se pokazilo...
      </Text>
    );
  }

  return (
    <>
      <VStack pt={28} gap={6}>
        {/* Seo component for this page is inside BookInfo component */}
        <BookInfo bookId={book} />
        <BookRelatedContent bookId={book} />
      </VStack>
    </>
  );
};

export default Book;
