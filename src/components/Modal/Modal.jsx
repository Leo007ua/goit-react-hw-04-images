import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalStyled } from './ModalStyled';

class Modal extends Component {
  handleClickOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onCloseModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.code === `Escape`) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener(`keydown`, this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.handleKeyDown);
  }

  render() {
    return (
      <ModalStyled className="overlay" onClick={this.handleClickOverlay}>
        <div className="modal">
          <img
            src={this.props?.modalData?.largeImageURL}
            alt={this.props?.modalData?.tags}
          />
        </div>
      </ModalStyled>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
};

export default Modal;
