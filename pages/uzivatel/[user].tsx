import NoSSR from '@/components/NoSSR';
import { Seo } from '@/components/Seo';
import { UserAvatar } from '@/components/UserAvatar';
import { useFetchAllOffersForUser } from '@/lib/customHooks/useFetchAllOffers';
import { useFetchProfile } from '@/lib/customHooks/useFetchProfile';
import { getHighestSizeLinkUrl } from '@/lib/getHighestResImgUrl';
import { GoogleBookApiBook } from '@/lib/types/GoogleBooksApi';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const PAGE_TITLE = 'Profil uživatele';
const PAGE_DESCRIPTION = 'Profil uživatele ve webové aplikace SWAPni TO.';

/**
 * User page takes uid to display info -> this should be username in future
 */
const User = () => {
  const router = useRouter();
  let { user } = router.query;
  if (Array.isArray(user)) {
    user = user[0];
  }

  return (
    <>
      {user ? (
        <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      ) : (
        <Seo title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      )}
      <VStack pt={28}>
        <Heading size={{ base: 'xl', md: '2xl' }}>Profil uživatele</Heading>
        <Stack
          pt={6}
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 0, md: '12' }}
        >
          <NoSSR>
            {user ? (
              <Flex justify={'center'}>
                <UserAvatar userId={user} size={'2xl'} />
              </Flex>
            ) : (
              <Spinner />
            )}

            <VStack>
              {user ? <UserDescription userId={user} /> : <Spinner />}
            </VStack>
          </NoSSR>
        </Stack>
        {user ? <UserCreatedContent userId={user} /> : <Spinner />}
      </VStack>
    </>
  );
};

const UserCreatedContent = ({ userId }: { userId: string }) => {
  const { status, data: offers } = useFetchAllOffersForUser({ userId });

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      {offers.map((offer, i) => (
        <BookOfferCard key={i} bookId={offer.bookId} />
      ))}
    </>
  );
};

const BookOfferCard = ({ bookId }: { bookId: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`,
    fetcher
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Heading color={'red'}>Něco se pokazilo...</Heading>;
  }

  const bookData: GoogleBookApiBook = data;

  const imgUrl = getHighestSizeLinkUrl(bookData.volumeInfo.imageLinks);

  return (
    <Box
      pos={'relative'}
      w={{ base: 150, md: 150 }}
      h={{ base: 200, md: 200 }}
      minW={150}
      objectFit={'cover'}
      overflow={'hidden'}
      mr={2}
      borderRadius={'md'}
    >
      <Link href={`/kniha/${bookId}`}>
        <Image
          src={imgUrl ? imgUrl : '/imgs/book-placeholder.jpg'}
          fill
          alt={bookData.volumeInfo?.title}
        />
      </Link>
    </Box>
  );
};

const UserDescription = ({ userId }: { userId: string }) => {
  const { data: userFirestore, status } = useFetchProfile(userId);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <Box textAlign={'left'}>
      <Heading
        size={'lg'}
        color={'swap.darkHighlight'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        {userFirestore?.userName ? userFirestore.userName : 'Nový uživatel'}
      </Heading>
      <Text>
        {userFirestore?.bio
          ? userFirestore.bio
          : 'Zatím jsem o sobě nic nenapsal :)'}
      </Text>
    </Box>
  );
};

export default User;
