import React, {Component} from 'react'
import SearchResult from "./SearchResult";
import NoResults from "./NoResults";
import hotels from "../../data/Hotel.js"
import ResultCounter from "./resultCounter";
import OfferList from "../OfferList";


class SearchBar extends Component {

    constructor() {
        super();
        this.state = {
            hotelDB: hotels.sort(this.compareHotels),
            results: [],
            searchPhrase: "",
            userID: -1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    compareHotels(a,b){
        return a.name - b.name;
    }

    changeUser(id){
        this.setState({
            userID: id,
        })
    }

    componentDidMount() {
        if(this.props.userID !== undefined)
            this.changeUser(this.props.userID)
    }

    handleChange(event) {
        const phrase = event.target.value;
        if (phrase === "") {
            this.setState ({
                results: [],
                searchPhrase: ""
            })
            return;
        }
        let myReg = new RegExp(phrase.toLowerCase() + ".*")
        const results = this.state.hotelDB.filter(hotel => hotel.city.toLowerCase().match(myReg));
        this.setState ( {
            results: results,
            searchPhrase: event.target.value
        })
    }

    displayResults(){
        if(this.state.results.length === 0 && this.state.searchPhrase !== ""){
            return <NoResults/>
        }
        let ret = [];
        for (let i = 0; i <3; i++) {
            if (this.state.results.length > i)
                ret = ret.concat(this.state.results[i]);
        }
        return ret.map(result => <SearchResult
            key={result.id}
            hotel={result}
            phrase={this.state.searchPhrase}
            changePage={this.props.changePage}
            userID={this.state.userID}
        />);
    }

    displayCounter(){
        if(this.state.results.length > 3)
            return (<ResultCounter count={this.state.results.length-3}/>)
    }

    showList(){
        this.props.changePage(<OfferList
            changePage={this.props.changePage}
            userID={this.state.userID}
            results={this.state.results}
            phrase={this.state.searchPhrase}
        />)
    }

    render(){
        return (
            <div>
                <p>Rezerwatrix</p>
                <div className='SearchBar'>
                    <form >
                        <input type='text' name="searchPhrase" placeholder='Search...' onChange={this.handleChange} autoComplete="off"/>
                    </form>
                    <button onClick={() => this.showList()}>Go</button>
                </div>
                {this.displayResults()}
                {this.displayCounter()}
            </div>
        )
    }
}

export default SearchBar;
