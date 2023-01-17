import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { MyContext } from './MyContext'

export default function Chapter() {
    const location = useLocation();
    // const MyContext = React.createContext();
    const navigate = useNavigate();

    const [pageData, setPageData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/chapter?url=${location.state.url}`)
            .then((response) => response.json())
            .then((data) => setPageData(data))
    }, [])

	const goBack = () => {
		navigate(-1);
	}

    const pageElements = pageData.map(page => <div className="chapter-page" > <img src={page} /> </div>)
    
    return (
        <>
            <button onClick={goBack}>{location.state.title}</button>
            {pageElements}
            <MyContext.Consumer>
                {nextChapter => (<button onClick={nextChapter}>Next Chapter</button>)}
            </MyContext.Consumer>
        </>
        
    );
}