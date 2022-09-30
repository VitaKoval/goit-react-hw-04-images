import { useState } from "react";
// import { ToastContainer} from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

function App() {
  const [keyword, setKeyword] = useState('');

const handleSearchFormSubmit = keyword => {
    // console.log(keyword);
    setKeyword(keyword);
  };

  return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <ImageGallery keyword={keyword} />
        {/* <ToastContainer/> */}
      </div>
    );

}

export default App;
