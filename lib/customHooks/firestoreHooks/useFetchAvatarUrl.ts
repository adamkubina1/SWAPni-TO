import { ref } from 'firebase/storage';
import { useStorage, useStorageDownloadURL } from 'reactfire';

/**
 * Custom hook fetching URL of user avatar from Firebase storage.
 * @param userId String of user id whos avatar url we want to return.
 * @returns { status, data: imageURL }
 */
const useFetchAvatarUrl = (userId: string) => {
  const storage = useStorage();
  const avatarRef = ref(storage, `userAvatars/${userId}`);

  return useStorageDownloadURL(avatarRef);
};

export { useFetchAvatarUrl };
