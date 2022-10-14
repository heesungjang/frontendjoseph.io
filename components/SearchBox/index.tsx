import Image from 'next/image';
import React from 'react';
import { Divider } from '../Layout/FrontPageLayout/styles';
import { IconWrapper, SearchContainer, SearchInput } from './styles';

export const SearchBox = ({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
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
      <Divider mt={20} mb="30px" />
    </>
  );
};
