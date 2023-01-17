import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import ChapterCard from "./ChapterCard"
import addImg from "../images/add.png"
import addedImg from "../images/added.png"
import { v4 as uuidv4 } from 'uuid';
// import { MyContext } from './MyContext'


export default function Manga() {
    const location = useLocation()

    const [added, setAdded] = useState(location.state.added)
    const [chaptersData, setChaptersData] = useState([])
    
    const [currenctChapter, setCurrentChapter] = useState(-1)

    useEffect(() => {
        fetch(`http://localhost:3000/manga?url=${location.state.url}`)
            .then((response) => response.json())
            .then((data) => {
                setChaptersData(data.chapters.map(ch => ({
                    ...ch,
                    title: location.state.title,
                    id: uuidv4(),
                })))
                setCurrentChapter(chaptersData[chaptersData.length - 1])
            });

        fetch(`http://localhost:3000/library`)
            .then((response) => response.json())
            .then((data) => {
                data.filter(x => x.url === location.state.url).length === 0 ? setAdded(false) : setAdded(true)
            });
    }, [])

    const nextChapter = () => { console.log("I'm in the Manga component")};

    function removeManga(url) {
        fetch('http://localhost:3000/removeManga', {
            method: "POST",
            body: JSON.stringify({
                "url": url,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }

    function addManga(manga) {
        fetch('http://localhost:3000/addManga', {
            method: "POST",
            body: JSON.stringify({
                ...manga
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }

    function toggleAdded() {
        added ? removeManga(location.state.url) : addManga(location.state)
        setAdded(prev => !prev)
    }

    const chapterElements = chaptersData.map(chapter => <ChapterCard key={chapter.id} nextChapter={nextChapter} {...chapter} />)

    return (
        <div className="App">
            <div className="Manga">
                <div className="Manga--info">
                    <img src={location.state.coverImage} alt="cover"/>
                    <div className="Manga--info-text">
                        <p className='title'>{location.state.title}</p>
                        <p className='author'>{location.state.authors}</p>
                        <p className='status'>Status: {location.state.status}</p>
                        <div 
                            className="Manga--info-button" 
                            onClick={toggleAdded}
                            style={{backgroundColor: added ? "#51C882" : "#675AF5"}}>
                            <img src={added ? addedImg : addImg}/>
                        </div>
                    </div>
                </div>
                <div className="Manga--chapters">
                    {chapterElements}
                </div>
            </div>
        </div>
    );
}
