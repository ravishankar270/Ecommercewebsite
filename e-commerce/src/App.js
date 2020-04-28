import React from 'react';
import './App.css'
import Content from './Content'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart' 
import Login from './Login'
import Home from './Home'
import Register from './Register'
import Profile from './Profile'
import { BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom'



function App(){
  return (
    <Router>
    <Switch>
      <Route path="/" exact strict component={Home}/>
    <Route path="/login" exact strict component={Login}/>
    <Route path="/register" exact strict component={Register}/>
      
      <Route path="/cart/:username" exact strict render={(prop)=>{return(
        <div>
        
        <Cart a={prop}/>
        
        </div>

      )}}/>
      <Route path="/profile" exact strict render={()=>{
        return(
          <Profile/>
        )
      }}/> 
      <Route path="/:Name" exact strict render={(prop)=>{return(
        <div>
        <Header a={prop}/>
        <Content />
        <Footer />
        </div>
      )}} />     
      
    
    </Switch>
    </Router>
      )
}


export default App;
