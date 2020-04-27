import React, {Component} from 'react'
import users from "../../data/users";

export default class Comment extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
        }
        this.checkUser = this.checkUser.bind(this)
        this.getUsername = this.getUsername.bind(this)
    }


    checkUser(u){
        if (u.id === this.props.comment.userID){
            this.setState({
                userName: u.login
            })
        }
    }

    getUsername(){
        if(this.props.comment.userID === -1){
            this.setState({
                userName: "Anonymous"
            })
        }
        else
            users.forEach(this.checkUser);
    }

    componentDidMount() {
        this.getUsername();
    }

    render(){
        return(
            <div className='comment'>
                <b>{this.state.userName}</b> writes:<hr/>
                <i>{this.props.comment.msg}</i>
            </div>
        )
    }
}