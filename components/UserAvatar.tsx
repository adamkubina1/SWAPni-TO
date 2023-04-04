import { Avatar, ResponsiveValue, Spinner } from '@chakra-ui/react';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useStorage } from 'reactfire';

const UserAvatar = ({
  userId,
  size,
}: {
  userId: string;
  size:
    | ResponsiveValue<
        | (string & {})
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | '2xl'
        | '2xs'
        | 'xs'
        | 'full'
      >
    | undefined;
}) => {
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const storage = useStorage();

  useEffect(() => {
    if (userId) {
      const avatarRef = ref(storage, `userAvatars/${userId}`);

      const getDownloadURLMine = async () => {
        try {
          const url = await getDownloadURL(avatarRef);
          setDownloadURL(url);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      };

      getDownloadURLMine();
    } else {
      setDownloadURL(null);
      setIsLoading(false);
    }
  }, [storage, userId]);

  if (isLoading) {
    return <Spinner />;
  }

  return <Avatar size={size} src={downloadURL ? downloadURL : ''} />;
};

export { UserAvatar };
