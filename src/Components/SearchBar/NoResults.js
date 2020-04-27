import React, {Component} from 'react'


export default class NoResults extends Component {

    constructor (props){
        super(props);
    }
    render(){
        return (
            <div className='SearchResult'>
                <table><tbody><tr>
                    <td><p>No results found</p></td>
                </tr></tbody></table>
            </div>
        )
    }
}


