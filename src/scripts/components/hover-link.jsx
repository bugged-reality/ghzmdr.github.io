import React from 'react'

export default class HoverLink extends React.Component {
    render() {
        const iconClasses = 'HoverLink_Icon Icon Icon-' + this.props.icon

        return <a className="HoverLink" href={this.props.to} target="_blank">
            <span className="HoverLink_Label">{this.props.label}</span>
            <span className={iconClasses}></span>
        </a>
    }
}