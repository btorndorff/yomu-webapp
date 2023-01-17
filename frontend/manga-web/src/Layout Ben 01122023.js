import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import {useLocation } from 'react-router-dom';
import { useEffect } from "react";

const Layout = () => {
  const [search, setSearch] = useState(false)
  const location = useLocation()

  function toggleSearch() {
    setSearch(prev => !prev)
  }

  useEffect(() => {
    setSearch(false)
  }, [location])

  return (
    <>
      {
        search ?
        <div className="App">
          <Search toggleSearch={toggleSearch}/>
        </div>
        :
        <div className="App">
          <Navbar toggleSearch={toggleSearch}/>
          <Outlet s/>
        </div>
      }
    </>
  )
};

export default Layout;