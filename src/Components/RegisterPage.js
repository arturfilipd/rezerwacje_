import React, {Component} from "react";
import users from "../data/users";
import fav from "../data/favourites";
import SearchBar from "./SearchBar/SearchBar";
import reserv from "../data/reservations";
import ReservationList from "./UserMenus/ReservationList";
import Registered from "./Registered";
export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            pass: "",
            pass2: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    register(){
        if(this.state.login === "" || this.state.pass === "" || this.state.pass2 === ""){
            this.setState({
                errCode: "All fields must be filled!",
            })
            return;
        }
        if(users.filter(u => u.login === this.state.login).length > 0 ){
            this.setState({
                errCode: "This username is already taken!",
            })
            return;
        }
        if(this.state.pass !== this.state.pass2){
            this.setState({
                errCode: "Passwords must be identical!",
            })
            return;
        }
        //Creating user
        const newID = users.length;
        users.push({
            id: newID,
            login: this.state.login,
            pass: this.state.pass
        })
        fav.set(newID, []);
        if(this.props.res === undefined){
            this.props.login(users[newID]);
            this.props.changePage(<SearchBar changePage={this.props.changePage} userID={newID}/>)
        }
        else{
            let newR = this.props.res;
            newR.id = reserv.length;
            newR.userID = newID;
            reserv.push(newR);
            this.props.changePage(<Registered changePage={this.props.changePage} userID={newID}/>)
        }

    }

    reservationInfo(){
        if(this.props.res !== undefined){
            return (
                <div className='info'>You must create an account to continue the process of reservation.</div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.reservationInfo()}
                <p>Register</p><hr/>
                <table className='resT'><tbody>
                <tr>
                    <td>Username:</td>
                    <td><input className='wideInput' type={'text'} name={'login'} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input className='wideInput' type={'password'} name={'pass'} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Repeat Password:</td>
                    <td><input  className='wideInput' type={'password'} name={'pass2'} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><button className='cremeButton' onClick={this.register}>Create</button></td>
                    <td>{this.state.errCode}</td>
                </tr>
                </tbody></table>
            </div>
        )
    }
}