import React from 'react'
import HoverLink from './hover-link'

export default class SocialLinks extends React.Component { 
    render() {
        return <div className="SocialLinks">
            <p>Find me on:</p>
            <HoverLink to="//github.com/ghzmdr" label="Github" icon="code" />
            <HoverLink to="//codepen.com/ghzmdr" label="CodePen" icon="codepen" />
            <HoverLink to="//twitter.com/ghzmdr" label="Twitter" icon="twitter" />
            <HoverLink to="//www.linkedin.com/in/vincentdefeo" label="LinkedIn" icon="linkedin" />
        </div>
    }
}