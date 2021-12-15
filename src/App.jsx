import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "./components/button/Button";
import ImageGallery from "./components/imageGallery/ImageGallery";
import LoaderFetch from "./components/loaderFetch/LoaderFetch";
import Modal from "./components/modal/Modal";
import Searchbar from "./components/searchbar/Searchbar";

function App() {
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");

  const fetchData = async (keyword, page) => {
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=23709180-349fcff3bbc1fea5bbf1858d4&q=${keyword}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`
    );
    return data.hits;
  };

  const fetchInitialView = () => {
    fetch(
      `https://pixabay.com/api/?key=23709180-349fcff3bbc1fea5bbf1858d4&q=&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=15`
    )
      .then((data) => data.json())
      .then((keyword) => {
        setImages(keyword.hits);
        setShowButton(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInitialView();
  }, []);

  useEffect(() => {
    if (!keyword) return;

    const fetchImages = async () => {
      try {
        const request = await fetchData(keyword, page);

        if (request.length === 0) {
          return alert(`No results were found for: ${keyword}`);
        }
        setImages((prevImages) => [...prevImages, ...request]);
      } catch (error) {
        alert("Something went wrong. Try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [keyword, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 1000);
  };

  const searchImages = (newSearch) => {
    setKeyword(newSearch);
    setImages([]);
    setPage(1);
    setIsLoading(true);
    setShowButton(true);
  };

  const loadMore = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    scrollPage();
  };

  const openModal = (evt) => {
    setLargeImageURL(evt.target.dataset.source);
    setTags(evt.target.alt);
    toggleModal();
  };

  return (
    <div className="App">
      <Searchbar onHandleSubmit={searchImages} />

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isLoading && <LoaderFetch />}

      {showButton && !isLoading && images.length >= 15 && (
        <Button label={"Load more"} fetchMoreImages={loadMore} />
      )}

      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

export default App;
