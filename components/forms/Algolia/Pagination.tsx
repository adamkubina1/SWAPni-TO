import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { HStack, Link } from '@chakra-ui/react';
import { connectPagination } from 'react-instantsearch-dom';

const Pagination = ({ currentRefinement, nbPages, refine }: any) => {
  return (
    <HStack>
      <ArrowLeftIcon
        _hover={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.preventDefault();
          if (currentRefinement > 1) refine(currentRefinement - 1);
        }}
      />
      {new Array(nbPages).fill(null).map((_, index) => {
        const page = index + 1;
        const style = {
          fontWeight: currentRefinement === page ? 'bold' : '',
        };

        if (
          page == currentRefinement ||
          page == currentRefinement + 1 ||
          page == currentRefinement - 1
        )
          return (
            <HStack key={index}>
              <Link
                color={
                  currentRefinement === page ? 'swap.lightHighlight' : 'white'
                }
                _hover={{ textDecor: 'none' }}
                href='#'
                style={style}
                onClick={(event) => {
                  event.preventDefault();
                  refine(page);
                }}
              >
                {page}
              </Link>
            </HStack>
          );
      })}
      <ArrowRightIcon
        _hover={{ cursor: 'pointer' }}
        onClick={(event) => {
          event.preventDefault();
          if (currentRefinement < nbPages) refine(currentRefinement + 1);
        }}
      />
    </HStack>
  );
};

export default connectPagination(Pagination);
