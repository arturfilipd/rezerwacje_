import React, {Component} from 'react'
import SearchResult from "./SearchBar/SearchResult";
import hotels from "../data/Hotel.js"


export default class OfferList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            pages: 1,
            currentPage: 1,
            sortBy: 0,
            searchPhrase: this.props.phrase,
            hotelDB: hotels,
            userID: -1,
        }
        this.countPages = this.countPages.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.getResults = this.getResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changeUser(id){
        this.setState({
            userID: id,
        })
    }

    getResults(){
        if (this.state.searchPhrase === "") {
            this.setState ({
                results: [],
            })
            return;
        }
        let myReg = new RegExp(this.state.searchPhrase.toLowerCase() + ".*")
        const results = this.state.hotelDB.filter(hotel => hotel.city.toLowerCase().match(myReg));
        let p = Math.ceil(results.length / 5);
        this.setState ( {
            results: results,
            currentPage: 1,
            pages: p
        })

    }

    componentDidMount() {
        if(this.props.userID !== null)
            this.changeUser(this.props.userID)
        if(this.props.results != null){
            console.log(this.props.results.length + "/ 5 = " + (this.props.results.length / 5));
            let p = Math.ceil(this.props.results.length / 5);
            this.setState({
                results: this.props.results,
                pages: p,
            })
        }
        else{
            this.getResults();
        }
    }

    countPages(){
        console.log(this.state.results.length + "/ 5 = " + (this.state.results.length / 5));
        let p = Math.ceil(this.state.results.length / 5);
        this.setState({
            pages: p
        })
    }

    getPage(i){
        let ret =[];
        for (let i = (this.state.currentPage-1)*5; i < (this.state.currentPage-1)*5+5; i++) {
            if (this.state.results.length > i)
                ret = ret.concat(this.state.results[i]);
        }
        return ret;
    }

    nextPage(){
        if(this.state.currentPage < this.state.pages){
            this.setState((prevState, props) => ({
                currentPage: prevState.currentPage + 1
            }));
        }
    }

    prevPage(){
        if(this.state.currentPage > 1){
            this.setState((prevState, props) => ({
                currentPage: prevState.currentPage - 1
            }));
        }
    }


    sortByName(a, b) {return b.name - a.name;}
    sortByLocation(a, b) {return b.city - a.city;}
    sortByCost(a, b) {return b.cost - a.cost;}
    sortByRank(a, b) {return b.stars - a.stars;}

    sortMethods = [this.sortByName, this.sortByLocation, this.sortByCost, this.sortByRank]

    changeSort(i){
        if(this.state.sortBy === i) {
            console.log(this.state.results);
            const rev = this.state.results.reverse()
            console.log(rev);
            this.setState((prevState, props) => ({
                results: rev,
                currentPage: 1
            }));
        }
        else{
            this.setState((prevState, props) => ({
                results: prevState.results.sort(this.sortMethods[i]),
                sortBy: i,
                currentPage: 1
            }))
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        const page = this.getPage(this.state.currentPage);
        const results = page.map(result => <SearchResult
            key={result.id}
            hotel={result}
            changePage={this.props.changePage}
            phrase={this.state.searchPhrase}
        />)

        return(
            <div>
                <div className='SearchBar'>
                    <form >
                        <input type='text' name="searchPhrase" defaultValue={this.props.phrase} onChange={this.handleChange} autoComplete="off"/>
                    </form>
                    <button onClick={this.getResults}>Go</button>
                </div>
                <div className={'ResultCounter'}>
                    <button onClick={this.prevPage}>←</button>
                    {this.state.currentPage} / {this.state.pages}
                    <button onClick={this.nextPage}>→</button>
                    displaying {page.length} out of {this.state.results.length} results...
                </div>
                <div className='SearchResultHeader'>
                    <table><tbody><tr>
                        <td onClick={()=>this.changeSort(0)}>Hotel</td>
                        <td onClick={()=>this.changeSort(1)}>Location</td>
                        <td onClick={()=>this.changeSort(2)}>Cost</td>
                        <td onClick={()=>this.changeSort(3)}>Ranking</td>
                    </tr></tbody></table>
                </div>
                {results}
            </div>
        )
    }
}