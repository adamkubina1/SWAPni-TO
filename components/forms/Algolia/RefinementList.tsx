import { Link, VStack } from '@chakra-ui/react';
import { connectRefinementList } from 'react-instantsearch-dom';

const RefinementList = ({ items, refine }: any) => {
  return (
    <VStack>
      {items.map((item: any, i: any) => (
        <Link
          _hover={{ textDecor: 'none' }}
          fontSize={'sm'}
          key={i}
          href='#'
          color={item.isRefined ? 'swap.lightHighlight' : 'white'}
          style={{
            fontWeight: item.isRefined ? 'bold' : '',
          }}
          onClick={(event) => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {item.label} ({item.count})
        </Link>
      ))}
    </VStack>
  );
};

export default connectRefinementList(RefinementList);
