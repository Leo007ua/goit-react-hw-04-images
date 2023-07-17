import PropTypes from 'prop-types';
import { ButtonStyled } from './ButtonStyled';

const Button = ({ fetchLoadMore }) => {
  return (
    <div>
      <ButtonStyled
        type="button"
        onClick={() => {
          fetchLoadMore();
        }}
      >
        Load more
      </ButtonStyled>
    </div>
  );
};

Button.propTypes = {
  fetchLoadMore: PropTypes.func.isRequired,
};

export default Button;
