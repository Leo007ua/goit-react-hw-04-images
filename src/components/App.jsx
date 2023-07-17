import { Component } from 'react';
import { requestPhotos } from 'services/api';
import { WraperStyled } from './WraperStyled';
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    pictureName: '',
    responcedPhotos: [],
    isLoading: false,
    error: null,
    page: 1,
    totalPictures: null,
    modal: { isOpen: false, modalData: null },
  };

  async componentDidUpdate(_, prevState) {
    const { pictureName, page } = this.state;
    if (
      this.state.pictureName !== prevState.pictureName ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ isLoading: true });
        const responcedPhotos = await requestPhotos(pictureName, page);
        // console.log(requestPhotos);
        this.setState({
          totalPictures: responcedPhotos.totalHits,
          responcedPhotos:
            page === 1
              ? responcedPhotos.hits
              : [...prevState.responcedPhotos, ...responcedPhotos.hits],
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  fetchLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmit = pictureName => {
    this.setState({
      pictureName: pictureName,
      page: 1,
    });
  };

  onOpenModal = data =>
    this.setState({ modal: { isOpen: true, modalData: data } });

  onCloseModal = data =>
    this.setState({ modal: { isOpen: false, modalData: null } });

  render() {
    const {
      responcedPhotos,
      isLoading,
      error,
      modal: { isOpen, modalData },
    } = this.state;
    return (
      <>
        <WraperStyled>
          <SearchBar onSubmit={this.onSubmit} />
          {isLoading && <Loader />}
          {error && <>Oops... Error: {error}</>}
          {responcedPhotos?.length > 0 && (
            <ImageGallery
              responcedPhotos={responcedPhotos}
              onOpenModal={this.onOpenModal}
            />
          )}

          {responcedPhotos.length > 0 &&
            responcedPhotos.length < this.state.totalPictures && (
              <Button fetchLoadMore={this.fetchLoadMore} />
            )}
          {isOpen && (
            <Modal onCloseModal={this.onCloseModal} modalData={modalData} />
          )}
        </WraperStyled>
      </>
    );
  }
}
