import React, {Component} from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar/SearchBar";
import UserBar from "./Components/UserBar";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: [],
            userID: -1,
        }
        this.changePage = this.changePage.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    changePage(page){
        this.setState({
            currentPage: page
        });

    }

    componentDidMount() {
        this.changePage(<SearchBar changePage={this.changePage}/>);
    }

    changeUser(id){
        this.setState({
            userID: id
        })
        //this.state.currentPage.changeUser(id);
    }


    render(){
        return (
            <div>
                <UserBar changePage={this.changePage} changeUser={this.changeUser}/>
                <div className='page'>
                    {this.state.currentPage}
                </div>
            </div>
        );
    }
}

export default App;
