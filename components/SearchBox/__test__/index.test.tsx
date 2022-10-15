import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBox from '../index';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import userEvent from '@testing-library/user-event';

describe('Search Box', () => {
  let searchValue: string;
  const setSearchValue = jest.fn((val) => (searchValue = val));

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </ThemeProvider>
    );
  });

  it('is rendered with placeholder', () => {
    const searchInput = screen.getByPlaceholderText(/search posts/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('type value should able to be inputted', async () => {
    const searchInput = screen.getByPlaceholderText(
      /search posts/i
    ) as HTMLInputElement;
    await userEvent.type(searchInput, '자바스크립트');
    expect(setSearchValue).toHaveBeenLastCalledWith('자바스크립트');
  });
});
