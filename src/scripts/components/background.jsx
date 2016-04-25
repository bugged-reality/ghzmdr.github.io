import React from 'react'
import p5 from 'p5'

import polkaSketch from '../../assets/sketches/polka'

export default class Background extends React.Component {
    
    componentDidMount() {
        console.log(this.refs.background)
        this.setState({
            sketch: new p5(polkaSketch(p5), this.refs.background)
        })
    }

    render() {
        return <div className="Background" ref="background">
            <div className="Overlay" />
        </div>
    }
}
