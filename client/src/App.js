//import dependencies
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//import auth token
import setAuthToken from './utils/setAuthToken'

//import components
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ComingSoon from './components/ComingSoon'

//import styling
import './App.css'

//check for token
if(localStorage.token){
    setAuthToken(localStorage.token)
}

export default function App() {
    return (
        <ComingSoon />

        // <Router>
        //     <Navbar />

        //     <Switch>
        //         <Route exact path="/" component={Home} />
        //         <Route path="/register" component={Register} />
        //         <Route path="/login" component={Login} />
        //     </Switch>
        // </Router>
    )
}
