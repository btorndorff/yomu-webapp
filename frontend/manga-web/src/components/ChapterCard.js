import goArrow from "../images/go-arrow.png"
import { Outlet, Link } from "react-router-dom";

export default function ChapterCard(props) {
  const chapter_state = {
    id: props.id,
    name: props.name,
    title: props.title,
    uploadDate: props.uploadDate,
    url: props.url,
    // nextChapter: props.nextChapter
  }
  console.log(props.nextChapter)
  return (
    <Link to={{pathname:`/manga/${props.title}/${props.name}`}} state={{ ...chapter_state}}  style={{textDecoration: 'none', color: "#C6D6E2"}} >
        <div className="Chapter--card">
          <div>
              <p className="chapter-number">{props.name}</p>
              <p className="release-date">{props.uploadDate}</p>
          </div>
          <img src={goArrow} alt="go-arrow"/>
        </div>
    </Link>
  );
}