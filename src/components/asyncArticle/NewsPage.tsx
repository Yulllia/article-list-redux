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
import { Button, InputGroup } from "react-bootstrap";

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

  const handleAdditionalArticles = () => {};

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
      <InputGroup className="mb-5 mt-3 w-75 d-flex align-items-center mx-auto">
        <SearchBar newsList={"news"} />
        <Button className="rounded" variant="primary" onClick={handleAdditionalArticles}>
           Get 10 articles 
        </Button>
      </InputGroup>
      {!articles?.length && <h4 className="display-flex text-center">Search not found anything. Try again!</h4>}
      <Container className="mb-3">
        <Row>
          {articles?.map((article: ArticleItem) => (
            <Col key={article.title} xs={12} sm={6} md={5} lg={4}>
              <ArticleCard
                key={article.title}
                article={article}
                news={"news"}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default NewsPage;
