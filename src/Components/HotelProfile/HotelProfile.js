import React, {Component} from "react";
import Comment from "./Comment"
import placeholder from "./placeholder.png"
import placeholder2 from "./placeholder2.png"
import comments from "../../data/comments.js"
import fav from  "../../data/favourites.js"
import reserv from "../../data/reservations";

import NewComment from "./NewComment";
import OfferList from "../OfferList";
import RegisterPage from "../RegisterPage";
import ReservationList from "../UserMenus/ReservationList";

export default class HotelProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            start: new Date(),
            end: new Date(),
            rooms: 1,
            totalCost: this.props.hotel.cost,
            comments: [],
            userID: -1,
            errMsg: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.getComments = this.getComments.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.refreshComments = this.refreshComments.bind(this);

    }

    changeUser(id){
        this.setState({
            userID: id,
        })
    }

    sortComments(a, b){
        return b.id - a.id;
    }

    getComments(comment){
        if(comment.hotelID === this.props.hotel.id && !this.state.comments.includes(comment)){
           let com = this.state.comments;
           com.push(comment);
           com.sort (this.sortComments);
            this.setState({
                comments: com
            })
        }
    }

    componentDidMount() {
        if(this.props.userID !== undefined)
            this.changeUser(this.props.userID)
        this.refreshComments();
    }

    refreshComments(){
        this.setState({
            comments: []
        })
        comments.forEach(this.getComments);
    }

    handleChange(event) {
        let {name, value} = event.target

        if(value < 1){
            value = 1;
            event.target.value = value;
        }
        this.setState({
            [name]: value
        })
    }

    calculateCost(){
        const dt1 = new Date(this.state.start);
        const dt2 = new Date(this.state.end);
        const diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        return(  diffDays * this.props.hotel.cost * this.state.rooms);
    }

    addReservation(){
        if(this.calculateCost() <= 0) return;

        //adding res
        let newR = {
            id: -1,
            userID: this.props.userID,
            hotelID: this.props.hotel.id,
            start: this.state.start.toString(),
            end: this.state.end.toString(),
            rooms: this.state.rooms,
            cancelled: false,
        }
        if(this.props.userID !== -1){
            newR.id = reserv.length;
            reserv.push(newR);
            this.props.changePage(<ReservationList changePage={this.props.changePage} userID={this.props.userID} new={true} />)
        }
        else{
            this.props.changePage(<RegisterPage changePage={this.props.changePage} res={newR}/>)
        }
    }

    favoriteButton(){
        if(this.state.userID === -1)  return;
        if( fav.get(this.props.userID).includes(this.props.hotel.id)){
            return(
                <div className='hotelLink'  onClick={()=>this.rmFav()}>Remove form favourites</div>
            )
        }
        else{
            return(
                <div className='hotelLink'  onClick={()=>this.addFav()}>Add to favourites</div>
            )
        }
    }

    addFav(){
        if(this.state.userID === -1){
            alert("You have to log in to take this action.");
            return;
        }
        fav.get(this.state.userID).push(this.props.hotel.id);
        this.forceUpdate();
    }

    rmFav(){
        if(this.state.userID === -1){
            alert("You have to log in to take this action.");
            return;
        }
        const index = fav.get(this.state.userID).indexOf(this.props.hotel.id);
        if (index > -1) {
            fav.get(this.state.userID).splice(index, 1);
        }
        this.forceUpdate();
    }

    tickUp(event){
        event.target.stepUp();
    }

    render(){
        const dt1 = new Date(this.state.start);
        const dt2 = new Date(this.state.end);
        const diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));

        const totalCost =  (diffDays * this.props.hotel.cost * this.state.rooms > 0 && new Date(this.state.start) >= new Date())?(diffDays * this.props.hotel.cost * this.state.rooms ):"--- ";
        const button = (totalCost === "--- ")?'smallButtonInactive':'smallButton';
        const comments =this.state.comments.map(c => <Comment key={c.id} comment={c}/>)
        const favB = this.favoriteButton();
        return(
            <div className='hotelProfile'>
                UID: {this.props.userID}
                <div className='hotelInfo'>
                    <div className='hotelInfoCol'>
                        <img src={placeholder} alt="not available"/>
                    </div>
                    <div className='hotelInfoDesc'>
                        <p>{this.props.hotel.name}</p>
                        {this.props.hotel.city}, {this.props.hotel.country}
                    </div>
                    <div className='hotelInfoCol'>
                        <img src={placeholder2} alt="not available"/>
                    </div>
                    <div className={'clr'}><hr/></div>
                </div>
                <div>
                    <div className='hotelBooking'>
                        <form>
                            <table>
                                <tbody>
                                <tr><td className='tabField'>Start:</td><td><input type="date" defaultValue={new Date().toLocaleDateString('en-CA')} required name={"start"} onChange={this.handleChange}/></td></tr>
                                <tr><td>End:</td><td><input type="date" defaultValue={new Date().toLocaleDateString('en-CA')} required name={"end"} onLoad={this.tickUp} onChange={this.handleChange}/></td></tr>
                                <tr><td>Rooms:</td><td><input type="number" defaultValue={1} name={"rooms"} onChange={this.handleChange}/></td></tr>
                                <tr><td>Total:</td><td>{totalCost} PLN</td></tr>
                                </tbody>
                            </table>
                        </form>
                        <button className={button} onClick={()=>this.addReservation()}>Book</button>
                    </div>
                    <div className='hotelLinks'>
                        <a href='http://www.example.com' rel="noopener noreferrer" target="_blank"  className='hotelLink'>Hotel Website</a>
                        {favB}
                        <div className='hotelLink' onClick={() => this.props.changePage(<OfferList changePage={this.props.changePage} phrase={this.props.phrase}/>)}>Return</div>
                    </div>
                </div>
                <div className='comments'>
                    <NewComment hotelID={this.props.hotel.id} userID={this.state.userID} refresh={this.refreshComments}/>
                    Comments ({this.state.comments.length})<hr/>
                    {comments}
                </div>
            </div>
        )
    }
}