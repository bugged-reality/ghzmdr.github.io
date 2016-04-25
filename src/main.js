import ReactDOM from 'react-dom'
import React from 'react'

import Style from './styles/main'
import Application from './scripts/components/application'
import HomePage from './scripts/components/home-page'
import AboutPage from './scripts/components/about-page'

import featureDetect from './scripts/tools/featureDetect'

import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={Application} >
        <IndexRedirect to="home"/>
        <Route path="home" component={HomePage}/>
        {/* <Route path="about" component={AboutPage} /> */}
    </Route>
</Router>, document.getElementById('Root'))

featureDetect()