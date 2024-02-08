import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { AsyncArticles, List } from "../../interfaces/interface";
import { setSearchTerm } from "../../redux/articlesSlice";
import { getArticleAsync, setSearchValue } from "../../redux/asyncSlice";

function SearchBar(props: { newsList?: string }) {
  const { newsList = null } = props;

  const dispatch = useDispatch();
  const search = useSelector((state: List) => state.articles.searchTerm);
  const searchNews = useSelector(
    (state: AsyncArticles) => state.asyncArticles.searchValue
  );

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };
  const handleSearchChangeNews = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const onSearch = () =>{
     if(newsList?.length){
      dispatch(getArticleAsync(searchNews));
     }
  }
 
  return (
    <InputGroup className={`${!newsList && "mb-5 mt-3"} w-75 d-flex align-items-center mx-auto`}>
      <InputGroup.Text role="button" className="btn btn-secondary" id="inputGroup-sizing-sm" onClick={onSearch}>Search</InputGroup.Text>
      <Form.Control
        aria-label="Search input for articles"
        value={searchNews ? searchNews : search}
        onChange={(e) =>
          (newsList?.length ? handleSearchChangeNews : handleSearchChange)(
            e.target.value
          )
        }
      />
    </InputGroup>
  );
}

export default SearchBar;
