import { useState, useEffect } from 'react';
import exitImg from '../images/exit.png'
import MangaCard from './MangaCard';


export default function Search(props) {
    const [mangaData, setMangaData] = useState([]) 
    const [searchData, setSearchData] = useState("")

    function searchManga(title) {
        fetch(`http://localhost:3000/search?title=${searchData}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length < 100) {
                        setMangaData(data.map(manga => ({
                            ...manga, 
                            title: manga.title.main,
                            status: manga.status.scan
                        }))
                    )}
            });
    }
    
    useEffect(() => {
        if (searchData.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                searchManga(searchData)
            }, 500)
          
            return () => clearTimeout(delayDebounceFn)
        }
    }, [searchData])

    function handleChange(event) {
        const {name, value} = event.target
        setSearchData(prev => value)
    }

    const mangaElements = mangaData.map(manga => <MangaCard {...manga} />)

    return (
        <>
            <nav className="home-nav">
                <p className="search-header">Search</p>
                <div onClick={props.toggleSearch}>
                    <img className="nav--search" src={exitImg} alt="exit" />
                </div>
            </nav>
            <input 
                className='searchBar'
                placeholder={"Search"}
                type="text"
                onChange={handleChange}
                name="searchData"
                value={searchData}
            />
            {mangaData.length > 0 && <div className="MangaList">{mangaElements}</div>}
            
        </>
        
    );
}