// import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { Route,HashRouter as Router, Redirect} from 'react-router-dom'
import TabBarExample from './views/TabBarExample'
import Home from './views/Home'
import Category from './views/Category'
import Cart from './views/Cart'
import Mine from './views/Mine'
import Detail from './views/Detail'

class App extends React.Component {
  render(){
  return (
    <div>
    <Router>
    <Route path="/home" component={Home}/>
    <Route path="/category" component={Category}/>
    <Route path="/detail" component={Detail}/>
    <Route path="/cart" component={Cart}/>
    <Route path="/mine" component={Mine}/>
    <Redirect from="/" to="/home" exact />
    <TabBarExample />
    </Router>
    </div>
  );
  }
}
export default App;
