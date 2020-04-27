import React, {Component} from 'react'
import HotelProfile from "../HotelProfile/HotelProfile";


class SearchResult extends Component {


    constructor (props){
        super(props);
    }

    drawStars(){
        let str = "";
        for(let i = 0; i < this.props.hotel.stars; i++)
              str += "⭐"
        return str;
    }


    render(){
        return (
            <div className='SearchResult' onClick={() => this.props.changePage(
                <HotelProfile
                    hotel={this.props.hotel}
                    changePage={this.props.changePage}
                    userID={this.props.userID}
                    phrase={this.props.phrase}
                />)}>
                <table><tbody><tr>
                    <td><p>{this.props.hotel.name}</p></td>
                    <td>{this.props.hotel.city}, {this.props.hotel.country}</td>
                    <td><p>{this.props.hotel.cost}zł</p></td>
                    <td>{this.drawStars()}</td>
                </tr></tbody></table>
            </div>
        )
    }
}

export default SearchResult;
