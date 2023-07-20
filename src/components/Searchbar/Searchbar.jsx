import PropTypes from 'prop-types'
import { useState } from 'react';
import { SearchbarStyled } from './SearchbarStyled';

function SearchBar ({onSubmit}) {
const [pictureName, setPictureName] = useState('');

const formOnSubmit = evt => {
    evt.preventDefault();
    onSubmit(pictureName);
    setPictureName('');
  };

    return (
      <SearchbarStyled className="searchbar">
        <form className="form" onSubmit={formOnSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
          className="input"
            name="pictureName"
           value={pictureName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange = {evt => setPictureName(evt.target.value)}
          />
        </form>
      </SearchbarStyled>
    );
  }


SearchBar.propsTypes = {
  onSubmit: PropTypes.func.isRequired,
}


export default SearchBar;