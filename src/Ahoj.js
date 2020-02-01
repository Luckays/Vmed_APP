import React from 'react'

class Ahoj extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="ahoj-component">
                <p>ahoj</p>
                { this.props.children }
            </div>
        )
    }
}

export default Ahoj