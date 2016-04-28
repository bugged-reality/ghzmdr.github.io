import React from 'react'
import Menu from './menu'
import Background from './background'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Application extends React.Component {
  render() {
		return <div id="Application">
            {/* <Menu /> */}
            <Background />
            {/* <RandomizeBkg /> */}


        <ReactCSSTransitionGroup
              component="div"
              transitionName="transition"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              style={{
                width: '100%',
                height: '100%'
              }}
            >
            {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
            })}
        </ReactCSSTransitionGroup>
    </div>
	}
}
