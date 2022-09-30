// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getImagePixabay from '../../services/imagesAPI';
import Modal from '../Modal/Modal';
import { Gallery, GaleryTitle } from '../ui/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { LoaderSpiner } from '../Loader/Loader';

function ImageGallery({ keyword }) {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    setImages([]);
    setPageNumber(1);
    setStatus('idle');
  }, [keyword]);

  useEffect(() => {
    if (keyword === '') {
      return;
    }

    pageNumber === 1 ? setStatus('pending') : setStatus('resolved');

    getImagePixabay(pageNumber, keyword)
      .then(({ hits, total }) => {
        // console.log(hits);
        if (total === 0) {
          return setStatus('rejected');
        }
        setImages(images => [...images, ...hits]);
        setStatus('resolved');
        setTotal(total);
      })
      .catch(error => setStatus('rejected'));
  }, [keyword, pageNumber]);

  const openModal = img => {
    setShowModal(true);
    setLargeImage(img);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    setPageNumber(pageNumber => pageNumber + 1);

    // window.scrollTo({
    //   top: images.length * 260 ,
    //   behavior: 'smooth',
    // });
  };

  // return >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  if (status === 'idle') {
    return <GaleryTitle>Enter a keyword to search...</GaleryTitle>;
  }

  if (status === 'pending') {
    return (
      <GaleryTitle>
        <LoaderSpiner /> Search...
      </GaleryTitle>
    );
  }
  // {(status === 'pending') && <GaleryTitle><LoaderSpiner /> Search...</GaleryTitle>}

  if (status === 'rejected') {
    return <GaleryTitle>Not found... Try another keyword</GaleryTitle>;
  }

  if (status === 'resolved') {
    return (
      <>
        <GaleryTitle>
          Found {total} images by keyword '{keyword}'
        </GaleryTitle>
        <Gallery>
          <ImageGalleryItem images={images} onOpenModal={openModal} />
        </Gallery>

        {total > images.length && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal onCloseModal={closeModal} largeImage={largeImage} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default ImageGallery;
