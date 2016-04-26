import React from 'react'
import SocialLinks from './social-links'

export default class HomePage extends React.Component {

    render() {

        return <div id="HomePage" className="Page">
            <div className="IntroText">
                <img className="Portrait" src={require('../../assets/images/portrait.png')} />
                <div className="Greetings">
                    <h2> Hi stranger </h2>
                    <h4> I'm Vincent </h4>
                </div>
            </div>

            <SocialLinks />
        </div>
    }
}