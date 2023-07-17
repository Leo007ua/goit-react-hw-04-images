import PropTypes from 'prop-types'
import { Component } from 'react';
import { SearchbarStyled } from './SearchbarStyled';

class SearchBar extends Component {
  state = {
    pictureName: '',
  };

  handleOnChange = evt => {
    this.setState({
      pictureName: evt.target.value,
    });
  };
  formOnSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.pictureName);
    this.resetForm(evt);
  }

  resetForm = evt => {
    evt.target.reset();
    this.setState({pictureName: ''})
  }
  render() {
    return (
      <SearchbarStyled className="searchbar">
        <form className="form" onSubmit={this.formOnSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            name="pictureName"
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange = {this.handleOnChange}
          />
        </form>
      </SearchbarStyled>
    );
  }
}

SearchBar.propsTypes = {
  onSubmit: PropTypes.func.isRequired,
}


export default SearchBar;