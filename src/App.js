import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './views/Home';
import Create from './views/Create';
import Edit from './views/Edit';
import BlogDetails from './views/BlogDetails';
import NotFound from './views/NotFound';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="route-view">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/blogs/:id"><BlogDetails /></Route>
            <Route path="/create"><Create /></Route>
            <Route path="/edit/:id"><Edit /></Route>
            <Route path="*"><NotFound /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
