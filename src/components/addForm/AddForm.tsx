import { useDispatch, useSelector } from "react-redux";
import { addArticle, reducerAddForm } from "../../redux/articlesSlice";
import SearchBar from '../search/SearchBar'
import { ChangeEvent, useReducer, useState } from "react";
import { ArticleItem, List } from "../../interfaces/interface";
import Form from "react-bootstrap/Form";

function AddForm() {
  const dispatch = useDispatch();
  const [article, dispatchArticle] = useReducer(reducerAddForm, {
    id: Date.now(),
    description: "",
    author: "",
    urlToImage: "",
    title: "",
  });

  const [fileName, setFileName] = useState<HTMLFormElement | null>(null);
  const articles = useSelector((state: List) => state.articles.list);
  const handleInputChange = (field: keyof ArticleItem, value: string) => {
    dispatchArticle({ type: "SET_FIELD", field, value });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const baseData = reader.result as string;
        const blob = dataURItoBlob(baseData);
        const url = URL.createObjectURL(blob);
        handleInputChange("urlToImage", url);
        setFileName(target.form);
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleAddArticle = () => {
    if (article.title.trim() && article.description.trim()) {
      dispatch(addArticle(article));
      dispatchArticle({ type: "RESET_FORM" });
      if (fileName) {
        fileName.reset();
      }
    }
  };

  return (
    <div>
      <Form className="form-inline mt-3 mb-3 w-75 mx-auto">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={article.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            value={article.author}
            onChange={(e) => handleInputChange("author", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={article.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Form.Group>
        <div onClick={handleAddArticle} className="btn btn-primary mb-2">
          Submit
        </div>
      </Form>
      {articles.length > 0 && <SearchBar />}
    </div>
  );
}

export default AddForm;
