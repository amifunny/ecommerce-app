import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import ProductPage from './ProductPage.js'

function App() {

  return (
    <div className="App">
       <Router>
          <Switch>
               {/* URL paths react listens to */}
              <Route exact path='/' component={ProductPage} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={LogIn} />
          </Switch>
      </Router> 
    </div>
  );
}

export default App;
