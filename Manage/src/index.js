import React from 'react'
import {render} from 'react-dom';
import { HashRouter, BrowserRouter ,Route } from 'react-router-dom';
import App from './App'

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

render(
    <Router>
        <HashRouter>
        <App/>
        {/* <Route component={App} /> */}
        </HashRouter>

    </Router>
    ,
    document.querySelector('#app')
)