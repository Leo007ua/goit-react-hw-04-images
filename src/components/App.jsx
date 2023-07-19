import { useEffect, useState } from 'react';
import { requestPhotos } from 'services/api';

import { WraperStyled } from './WraperStyled';
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [responcedPhotos, setResponcedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    modalData: null,
  });

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    async function fetchRender() {
      try {
        setIsLoading(true);
        const responcedPhotos = await requestPhotos(pictureName, page);
        setTotalPictures(responcedPhotos.totalHits);
        setResponcedPhotos(prevState => {
          return page === 1
            ? responcedPhotos.hits
            : [...prevState, ...responcedPhotos.hits];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRender();
  }, [pictureName, page]);

  const fetchLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = pictureName => {
    setPictureName(pictureName);
    setPage(1);
  };

  const onOpenModal = data => {
    setModal({ isOpen: true, modalData: data });
  };

  const onCloseModal = () => setModal({ isOpen: false, modalData: null });

  return (
    <>
      <WraperStyled>
        <SearchBar onSubmit={onSubmit} />
        {isLoading && <Loader />}
        {error && <>Oops... Error: {error}</>}
        {responcedPhotos?.length > 0 && (
          <ImageGallery
            responcedPhotos={responcedPhotos}
            onOpenModal={onOpenModal}
          />
        )}

        {responcedPhotos.length > 0 &&
          responcedPhotos.length < totalPictures && (
            <Button fetchLoadMore={fetchLoadMore} />
          )}
        {modal.isOpen && (
          <Modal onCloseModal={onCloseModal} modalData={modal.modalData} />
        )}
      </WraperStyled>
    </>
  );
}
