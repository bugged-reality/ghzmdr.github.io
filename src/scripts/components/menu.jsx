import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component {
    render() {
        return <nav className="Menu">
            <ul>
                <li><Link className="MenuItem" activeClassName="current" to="/home">Home</Link></li>
                <li><Link className="MenuItem" activeClassName="current" to="/about">About</Link></li>
            </ul>
        </nav>
    }
}