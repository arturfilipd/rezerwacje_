import React, {Component} from 'react'


export default class ResultCounter extends Component {

    render(){
        return (
            <div className='ResultCounter'>
                and {this.props.count} more...
            </div>
        )
    }
}


