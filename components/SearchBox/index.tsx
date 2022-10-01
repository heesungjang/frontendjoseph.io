import Image from 'next/image';
import React from 'react';
import { IconWrapper, SearchContainer, SearchInput } from './styles';

type SearchBoxProp = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

// 타입 지정하기 !!
export const SearchBox: React.FunctionComponent<SearchBoxProp> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <SearchContainer onClick={() => setSearchValue(searchValue)}>
      <SearchInput
        placeholder="Search Posts..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IconWrapper>
        <Image
          src="/assets/search_icon.png"
          alt="search-box"
          width={15}
          height={15}
        />
      </IconWrapper>
    </SearchContainer>
  );
};
