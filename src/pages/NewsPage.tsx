import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAdditional, getArticleAsync, setTotalQuantity } from "../redux/asyncSlice";
import {
  ArticleItem,
  ArticlesAdditional,
  AsyncArticles,
  ListAsync,
} from "../interfaces/interface";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArticleCard from "../components/articleCard/ArticleCard";
import SearchBar from "../components/search/SearchBar";
import { Button, InputGroup } from "react-bootstrap";

function NewsPage() {
  const dispatch = useDispatch();
  const list = useSelector((state: ListAsync) => state.asyncArticles.list);
  const total = useSelector((state: ListAsync) => state.asyncArticles.totalPage);

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


  const handleAdditionalArticles = () => {
    dispatch(setTotalQuantity(10));
    const uniqueExistingArticlesTitles = articles?.map(
      (article: ArticleItem) => article.title
    );

    const articlesAdditional: ArticlesAdditional = {
      search: null,
      titles: uniqueExistingArticlesTitles,
      totalPages: total
    }
    dispatch(getArticleAdditional(articlesAdditional));
  };

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
      <InputGroup className="mb-2 mt-3 w-75 d-flex align-items-center mx-auto">
        <SearchBar newsList={"news"} />
      </InputGroup>
      <div className="rounded text-center mx-auto display-flex mt-3 mb-5">
      <Button
          className="rounded text-center mx-auto display-flex"
          variant="primary"
          onClick={handleAdditionalArticles}
        >
          Get 10 articles
        </Button>
      </div>
      {!articles?.length && (
        <h4 className="display-flex text-center">
          Search not found anything. Try again!
        </h4>
      )}
      <Container className="mb-3">
        <Row>
          {articles?.map((article: ArticleItem, index: number) => (
            <Col key={index} xs={12} sm={6} md={5} lg={4}>
              <ArticleCard
                key={index}
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
