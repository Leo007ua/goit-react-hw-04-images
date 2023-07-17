import PropTypes from 'prop-types';
import { ImgGalleryStyledUl } from './ImageGalleryStyled';
import ImageGalleryItem from 'components/ImageGalleryItem /ImageGalleryItem';

function ImageGallery({ responcedPhotos, onOpenModal }) {
  return (
    <ImgGalleryStyledUl>
      {responcedPhotos.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </ImgGalleryStyledUl>
  );
}

ImageGallery.propTypes = {
  responcedImages: PropTypes.array,
  onOpenModal: PropTypes.func,
};

export default ImageGallery;
