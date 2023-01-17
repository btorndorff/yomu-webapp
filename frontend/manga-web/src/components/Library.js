import MangaCard from "./MangaCard";
import React, { useState, useEffect } from 'react';
// import { Outlet, Link } from "react-router-dom";

export default function Library() {
  const [libraryData, setLibraryData] = useState([])

  useEffect(() => {
      fetch('http://localhost:3000/library')
          .then((response) => response.json())
          .then((data) => setLibraryData(data));
  }, [])

  const libraryElements = libraryData.map(manga => <MangaCard key={manga._id} {...manga} />)

  return (
    <div className="App">
      {/* <Navbar /> */}
      <p className="home--header">Library</p>
      <div className="MangaList">
            {libraryElements}
      </div>
    </div> 
  );
}
