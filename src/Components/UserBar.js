import React, {Component} from "react";
import users from "../data/users";
import SearchBar from "./SearchBar/SearchBar";
import Favourites from "./UserMenus/Favourites";
import LogInScreen from "./UserMenus/LogIn";
import ReservationList from "./UserMenus/ReservationList.js";
import AccountPage from "./UserMenus/Account";
import RegisterPage from "./RegisterPage";
export default class UserBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            userID: -1,
            username: "",
            errCode: "",
            inputLogin: "",
            inputPass: "",
        }
        this.checkUser = this.checkUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.loginNewUser = this.loginNewUser.bind(this);
    }

    async checkUser(u){
        if(this.state.inputLogin === u.login && this.state.inputPass === u.pass){
            this.setState({
                logged: true,
                username: u.login,
                userID: u.id,
            })
            this.props.changePage(<LogInScreen changePage={this.props.changePage} userID={u.id}/>);
            await this.sleep(500);
            this.props.changePage(<SearchBar changePage={this.props.changePage} userID={u.id}/>);

        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


    login(){
        if(this.state.inputLogin === "" || this.state.inputPass === "") return;
        users.forEach(this.checkUser);
        if(!this.state.logged)
            this.setState({
                errCode: "Login or password incorrect!"
            })
    }

    loginNewUser(u){
        this.setState({
            logged: true,
            username: u.login,
            userID: u.id,
        })
    }

    async logout(){
        this.setState({
            logged: false,
            userID: -1,
            username: "",
            errCode: "",
            inputLogin: "",
            inputPass: "",
        })
        this.props.changePage(<LogInScreen changePage={this.props.changePage}/>);
        await this.sleep(500);
        this.props.changePage(<SearchBar changePage={this.props.changePage} userID={-1}/>);
    }

    openFav(){
        this.props.changePage(
            <Favourites
                changePage={this.props.changePage}
                userID={this.state.userID}
            />
        )
    }

    openRes(){
        this.props.changePage(
            <ReservationList
                changePage={this.props.changePage}
                userID={this.state.userID}
            />
        )
    }

    openAcc(){
        this.props.changePage(
            <AccountPage
                changePage={this.props.changePage}
                userID={this.state.userID}
            />
        )
    }

    openReg(){
        this.props.changePage(
            <RegisterPage
                changePage={this.props.changePage}
                login={this.loginNewUser}
            />
        )
    }

   sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    renderBar(){
        if(this.state.logged){
            return(
                <div className='UserBar'>
                    <div className='logo' onClick={()=>this.props.changePage(<SearchBar changePage={this.props.changePage} userID={this.state.userID}/>)}>
                        REZERWATRIX
                    </div>
                    <div className='loginGreet'>
                        Hello {this.state.username}!
                    </div>
                    <div className='loginButtons' >
                        <button className='cremeButton' onClick={() =>this.logout()}>Log Out</button>
                        <button className='menuButtons' onClick={() =>this.openRes()}>Reservations</button>
                        <button className='menuButtons' onClick={() =>this.openFav()}>Favourites</button>
                        <button className='menuButtons' onClick={() =>this.openAcc()}>Account</button>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className='UserBar'>
                    <div className='logo' onClick={()=>this.props.changePage(<SearchBar changePage={this.props.changePage}/>)}>
                        REZERWATRIX
                    </div>
                    <div className='loginInput'>
                        <form>
                            <input type="text" name={"inputLogin"} onChange={this.handleChange}/>
                            <input type="password" name={"inputPass"} onChange={this.handleChange}/>
                        </form>
                    </div>
                    <div className='loginButtons'>
                        <button className='cremeButton' onClick={() =>this.login()}>Log In</button>
                        <button className='cremeButton' onClick={() => this.openReg()}>Join</button>
                        {this.state.errCode}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderBar()}
            </div>
        )
    }
}