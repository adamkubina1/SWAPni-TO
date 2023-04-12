import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ refine }: any) => {
  return (
    <form
      action=''
      role='search'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <InputGroup>
        <Input
          id='algolia_search'
          type='search'
          placeholder={'Vyhledat'}
          onChange={(e) => refine(e.currentTarget.value)}
          backgroundColor={'swap.lightBase'}
          color={'swap.lightText'}
          borderColor={'gray.400'}
          _placeholder={{
            color: 'gray.400',
          }}
        />
        <InputRightAddon
          px={0}
          backgroundColor={'swap.lightHighlight'}
          borderColor={'swap.lightHighlight'}
        >
          <Button
            color={'swap.darkHighlight'}
            backgroundColor={'swap.lightHighlight'}
          >
            <MdSearch />
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  );
};

export default connectSearchBox(SearchBox);
