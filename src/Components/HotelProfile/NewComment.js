import React, {Component} from "react";
import comments from "../../data/comments.js"

export default class NewComment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg:  ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }


    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    send(event){
        if(this.state.msg !== ""){
            comments.push(
                {
                    id: comments.length,
                    hotelID: this.props.hotelID,
                    userID: this.props.userID,
                    msg: this.state.msg
                }
                );
            this.setState({
                msg: ""
            })
            document.getElementById("ta").value = "";
            this.props.refresh();
        }
        console.log(comments);
    }

    render(){
        return (
            <div className='comment'>
                <form className='newCommentForm'>
                    <textarea id="ta" name="msg" cols={40} rows={10} maxLength={254} onChange={this.handleChange}/>

                </form>
                <button className="smallButton" onClick={() => this.send()}>Send</button>
            </div>
        )
    }
}