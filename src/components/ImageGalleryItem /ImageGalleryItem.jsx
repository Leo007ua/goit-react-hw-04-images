import PropTypes from 'prop-types';
import { ImgGalleryStyledLi, ImgStyled } from './ImageGalleryItemStyled';
function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <ImgGalleryStyledLi key={id}>
      <ImgStyled
        src={webformatURL}
        alt={tags}
        loading='lazy'
        onClick={() => {
          onOpenModal({ id, tags, largeImageURL });
        }}
      />
    </ImgGalleryStyledLi>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
