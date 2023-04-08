import { Flex, HStack, Icon } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const Rating = ({
  rating,
  maxRating,
}: {
  rating: number;
  maxRating: number;
}) => {
  const starArray = Array(maxRating).fill(null);

  return (
    <HStack>
      <>
        {starArray.map((star, i) => (
          <RatingStar key={i} filled={i <= Number(rating) - 0.5} />
        ))}
      </>
    </HStack>
  );
};

const RatingStar = ({ filled }: { filled: boolean }) => {
  return (
    <Flex color={filled ? 'yellow.400' : 'grey'} align={'center'}>
      <Icon as={FaStar} />
    </Flex>
  );
};

export { Rating };
