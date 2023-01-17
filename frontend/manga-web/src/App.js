import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Library from './components/Library';
import Manga from './components/Manga';
import Chapter from './components/Chapter';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Library />} />
          <Route path="manga/:title" element={<Manga />} />
          <Route path="manga/:title/:chapter" element={<Chapter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
