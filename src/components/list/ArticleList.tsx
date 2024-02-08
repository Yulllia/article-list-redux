import { useSelector } from "react-redux";
import { ArticleItem, List } from "../../interfaces/interface";
import "./ArticleList.css";
import ArticleCard from "../articleCard/ArticleCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

function ArticleList() {
  const articles = useSelector((state: List) => state.articles.list);
  const search = useSelector((state: List) => state.articles.searchTerm);

  const [filteredArticles, setFilteredArticles] = useState<ArticleItem[]>([]);

  useEffect(() => {
    const newFilteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArticles(newFilteredArticles);
  }, [articles, search]);


  return (
    <Container className="mb-3">
      <Row>
        {filteredArticles?.map((article: ArticleItem) => (
          <Col key={article.id} xs={12} sm={6} md={5} lg={4}>
            <ArticleCard key={article.id} article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArticleList;
