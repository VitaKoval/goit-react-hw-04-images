// import React, { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  IconSearch,
} from '../ui/Searchbar';
// import { toast } from 'react-toastify';

function Searchbar({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = evt => {
    setKeyword(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (keyword.trim() === '') {
      alert('Enter keywor for search!');
      return;
    }

    onSubmit(keyword);
    setKeyword('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <IconSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
