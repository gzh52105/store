import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import List from './List'
import Add from './Add'

class Student extends React.Component {
    componentDidMount() {
    }
    render() {
        const { path } = this.props.match
        return (
            <div>
                
                <Switch>
                    <Route path={path + "list"} component={List} />
                    <Route path={path + "add"} component={Add} />
                    {/* <Redirect from={path + ""} to={path + "/listj"} exact /> */}
                </Switch>
            </div>
        )
    }
}




export default Student;