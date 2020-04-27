import React, {Component} from "react";
import fav from '../../data/favourites.js'
import hotels from "../../data/Hotel.js"
import SearchResult from "../SearchBar/SearchResult";

export default class Favourites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            userID: -1,
            hotelDB: hotels,
        }
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(id){
        this.setState({
            userID: id,
        })
    }

    componentDidMount() {
        this.getFavourites();
        if(this.props.userID !== undefined)
            this.changeUser(this.props.userID)
    }


    getFavourites() {
        const results = this.state.hotelDB.filter(hotel => fav.get(this.props.userID).includes(hotel.id));
        this.setState ( {
            results: results,
        })
    }

    displayFav(){
        if(this.state.results.length === 0){
            return("Add some locations to your favourites to be displayed here");
        }
        else{
            return(
                    this.state.results.map(result => (<SearchResult key={result.id} hotel={result} changePage={this.props.changePage} userID = {this.state.userID} returnTo="fav"/>))
            )
        }
    }

    render() {
        return (
            <div>
                <p>Favourites</p>
                <hr/>
                {this.displayFav()}
            </div>
        )
    }
}