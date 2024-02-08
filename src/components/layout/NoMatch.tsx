import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="display-flex text-center mt-5">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page of the app</Link>
      </p>
    </div>
  );
}

export default NoMatch;