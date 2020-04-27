import React, {Component} from "react";
import users from "../../data/users";
import reserv from "../../data/reservations";
import fav from "../../data/favourites";
import comments from "../../data/comments";



export default class AccountPage extends Component{

    constructor(props) {
        super(props);
        this.state= {
            nPass : "",
            oPass : "",
            rPass : "",
            errCode: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.changePass = this.changePass.bind(this);
    }


    countComments(){
        const myComm = comments.filter(com => com.userID === this.props.userID);
        return myComm.length;
    }

    countRes(){
        const myRes= reserv.filter(com => com.userID === this.props.userID);
        return myRes.length;
    }


    countFav(){
        const myFav= fav.get(this.props.userID);
        return myFav.length;
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }


    changePass() {
        if (this.state.oPass === "" || this.state.nPass === "" || this.state.rPass === "") {
            this.setState({
                errCode: "All fields must be filed!",
            })
            return;
        }
        if (this.state.rPass !== this.state.nPass){
            this.setState({
                errCode: "Passwords must be identical!",
            })
            return;
        }
        if (this.state.oPass !== users[this.props.userID].pass){
            this.setState({
                errCode: "Wrong password!",
            })
            return;
        }
        this.setState({
            errCode: "Password changed!",
        })
        users[this.props.userID].pass = this.state.nPass;
    }
    render() {
        return(
            <div>
                <p>Account</p><hr/>
                <h2>Info</h2>
                <table className='resT'><tbody>
                <tr>
                    <td>Reservations made:</td>
                    <td>{this.countRes()}</td>
                </tr>
                <tr>
                    <td>Places favourited:</td>
                    <td>{this.countFav()}</td>
                </tr>
                <tr>
                    <td>Comments written:</td>
                    <td>{this.countComments()}</td>
                </tr>
                </tbody></table>

                <h2>Change Password</h2>
                <table className='resT'><tbody>
                <tr>
                    <td>Current Password:</td>
                    <td><input className='wideInput' type ="password" name={"oPass"} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>New Password:</td>
                    <td><input className='wideInput' type ="password" name={"nPass"} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td>Repeat Password</td>
                    <td><input className='wideInput' type ="password" name={"rPass"} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                    <td><button  className='cremeButton' onClick={this.changePass}>Change</button></td>
                    <td>{this.state.errCode}</td>
                </tr>
                </tbody></table>
            </div>
        )
    }
}