import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { List } from "../../interfaces/interface";
import { setSearchTerm } from "../../redux/articlesSlice";


function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state: List) => state.articles.searchTerm);

  const handleSearchChange = (value: string) => {
       dispatch(setSearchTerm(value));
  };

  return (
    <InputGroup className="mb-5 mt-3 w-75 d-flex align-items-center mx-auto">
      <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      <Form.Control aria-label="Text input with checkbox" value={search}
        onChange={(e) => handleSearchChange(e.target.value)}/>
    </InputGroup>
  );
}

export default SearchBar;
