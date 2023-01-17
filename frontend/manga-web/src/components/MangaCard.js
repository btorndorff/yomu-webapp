import author from "../images/author.png"
// import goArrow from "../images/go-arrow.png"
import update from "../images/update.png"
import { Outlet, Link } from "react-router-dom";

export default function MangaCard(props) {
  return (
    <Link to={{pathname:`/manga/${props.title.replace(" ", "-")}`}} state={{ ...props}} style={{textDecoration: 'none'}} >
      <div className="MangaList--manga">
          <img className="MangaList--manga-cover" src={props.coverImage} alt="cover" />
          <div className="MangaList--manga-info">   
              <p>{props.title}</p>
              <div className="MangaList--manga-author">
                  <img src={author} alt="author"/>
                  <p className="author">{props.authors[0]}</p>
              </div>
              <div className="MangaList--manga-update">
                  <img src={update} alt="update"/>
                  <p>4 hours ago</p>
              </div>
          </div>
          {/* <img className="MangaList--manga-arrow" src={goArrow} alt="go-arrow"/> */}
      </div>
    </Link>
    
  );
}