import { useDispatch, useSelector } from "react-redux";
import { ArticleItem, List } from "../../interfaces/interface";
import { deleteArticle, pinItem } from "../../redux/articlesSlice";
import "./ArticleCard.css";
import Trash from "../../assets/trash.png";
import Pinned from "../../assets/pinned.png";
import UnPinned from "../../assets/unpinned.png";

function ArticleCard(props: { article: ArticleItem }) {
  const { article } = props;

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
      <img src={article.image} alt={article.image} className="imageCard"/>
      <img
        src={Trash}
        alt="trash"
        className="trashIcon"
        onClick={() => handleRemoveArticle(article.id)}
      />
      {pinnedItem === article.id ? (
        <img
          src={Pinned}
          alt="pinned"
          className="pinnedIcon"
          onClick={() => handlePinItem(article.id)}
        />
      ) : (
        <img
          src={UnPinned}
          alt="unPinned"
          className="pinnedIcon"
          onClick={() => handlePinItem(article.id)}
        />
      )}

      <div className="container">
        <h4>
          <b>{article.title}</b>
        </h4>
        <p>{article.author}</p>
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default ArticleCard;
