import { Fragment } from "react";
import { Link } from "react-router-dom";

const SignUp = () => <Fragment>
  <div style={{ fontSize: "x-large", marginBottom: "1em" }}>
    Valid logins are:
    <ul>
      <li>user1@example.com</li>
      <li>user2@example.com</li>
      <li>user3@example.com</li>
      <li>user4@example.com</li>
    </ul>
    Password: password1234
  </div>
  <Link to="/login">
    <button>Back to Login Screen</button>
  </Link>
</Fragment>


export default SignUp
