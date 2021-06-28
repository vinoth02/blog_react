//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//import Blog from './blog/Post';
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
// import Login from "./auth/Login";
// import Signup from "./auth/Signup";
import BlogPost from "./blog/Post";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        {/* <Route exact path="/BlogPost" component={BlogPost} /> */}
        <Route exact path="/" component={BlogPost} />
        {/* <Route exact path="/" component={Login} /> */}
        {/* <Route exact path="/Signup" component={Signup} /> */}
      </Switch>
    </div>
  </Router>
  );
}

export default App;
