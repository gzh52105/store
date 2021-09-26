import React from 'react'
import {Route} from 'react-router-dom'

import List from './List'
import Add from './Add'
function Subject(){
    return (
        <div>
            Subject
            <Route path="/subject/list" component={List}></Route>
            <Route path="/subject/add" component={Add}></Route>
            </div>
    )
}

export default Subject;