import { SearchType } from '@/lib/types/SearchType';
import { Select } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

const searchOptions: Array<{ value: SearchType; description: string }> = [
  { value: 'searchBookName', description: 'Knihu název/autora/ISBN' },
  { value: 'searchOffer', description: 'Nabídku dle názvu knihy' },
];

export const SearchTypeForm = ({
  searchType,
  setSearchType,
}: {
  searchType: SearchType;
  setSearchType: Dispatch<SetStateAction<SearchType>>;
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as SearchType);
  };

  return (
    <form>
      <Select
        value={searchType}
        onChange={handleSelectChange}
        color={'swap.lightHighlight'}
      >
        {searchOptions.map((option, i) => (
          <option id={'searchOption'} key={i} value={option.value}>
            {option.description}
          </option>
        ))}
      </Select>
    </form>
  );
};
