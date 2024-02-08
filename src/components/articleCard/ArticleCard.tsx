import { useDispatch, useSelector } from "react-redux";
import { ArticleItem, List } from "../../interfaces/interface";
import { deleteArticle, pinItem } from "../../redux/articlesSlice";
import "./ArticleCard.css";
import Trash from "../../assets/trash.png";
import Pinned from "../../assets/pinned.png";
import UnPinned from "../../assets/unpinned.png";
import NoImage from "../../assets/no-image.jpg";

function ArticleCard(props: { article: ArticleItem; news?: string | null }) {
  const { article, news = null } = props;

  const pinnedItem = useSelector((state: List) => state.articles.pinnedItem);

  const dispatch = useDispatch();

  const handleRemoveArticle = (id: number) => {
    dispatch(deleteArticle(id));
  };

  const handlePinItem = (id: number) => {
    dispatch(pinItem(id));
  };

  return (
    <div key={article.id} className="card card-article mb-3">
      <img
        src={article.urlToImage ?? NoImage}
        alt={article.urlToImage}
        className="imageCard"
      />
      {!news && (
        <img
          src={Trash}
          alt="trash"
          className="trashIcon"
          onClick={() => handleRemoveArticle(article.id)}
        />
      )}
      {!news && (
        <img
          src={pinnedItem === article.id ? Pinned : UnPinned}
          alt={pinnedItem === article.id ? "pinned" : "unPinned"}
          className="pinnedIcon"
          onClick={() => handlePinItem(article.id)}
        />
      )}
      <div className="container mh-100"  style={{height: "220px"}}>
        <h4 className="title">
          <b>{article.title}</b>
        </h4>
        <p>{article.author}</p>
        <p className="description">{article.description}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
