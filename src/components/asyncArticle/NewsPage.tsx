import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAsync } from "../../redux/asyncSlice";
import {
  ArticleItem,
  AsyncArticles,
  List,
  ListAsync,
} from "../../interfaces/interface";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArticleCard from "../articleCard/ArticleCard";

function NewsPage() {
  const dispatch = useDispatch();
  const list = useSelector((state: ListAsync) => state.asyncArticles.list);
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
      <h1>News Articles</h1>
      <Container className="mb-3">
        <Row>
          {articles?.map((article: ArticleItem) => (
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
