import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAsync } from "../../redux/asyncSlice";
import {
  ArticleItem,
  AsyncArticles,
  ListAsync,
} from "../../interfaces/interface";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArticleCard from "../articleCard/ArticleCard";
import SearchBar from "../search/SearchBar";
import { useState } from "react";
import { filterArticles } from "../../utils/utils";

function NewsPage() {
  const dispatch = useDispatch();
  const list = useSelector((state: ListAsync) => state.asyncArticles.list);
  const search = useSelector((state: AsyncArticles) => state.asyncArticles.searchValue);
  const [filteredArticles, setFilteredArticles] = useState<ArticleItem[] | undefined>([]);
  
  const isLoading = useSelector(
    (state: AsyncArticles) => state.asyncArticles.isLoading
  );
  const error = useSelector(
    (state: AsyncArticles) => state.asyncArticles.error
  );

  const { articles } = list;

  useEffect(() => {
    dispatch(getArticleAsync());
  }, [dispatch]);


  useEffect(() => {
    const newFilteredArticles = filterArticles(articles, search);
    setFilteredArticles(newFilteredArticles);
  }, [articles, search]);


  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3 className="display-flex text-center mt-4 mb-5">News Articles</h3>
      {articles && articles?.length > 0 && <SearchBar newsList={"news"}/>}
      <Container className="mb-3">
        <Row>
          {filteredArticles?.map((article: ArticleItem) => (
            <Col key={article.title} xs={12} sm={6} md={5} lg={4}>
              <ArticleCard key={article.title} article={article} news={'news'}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default NewsPage;
