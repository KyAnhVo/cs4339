import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import SearchPage from './SearchPage';
import WatchlistPage from './WatchlistPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
