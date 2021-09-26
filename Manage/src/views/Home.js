import React from "react";

import {withUser,withStorage} from '../utils/hoc'
function Home(props){
    console.log('Home.props',props);
    return (
        <div>
            Home
        </div>
    )
}
Home = withUser(Home)
Home = withStorage('userInfo')(Home)
export default Home