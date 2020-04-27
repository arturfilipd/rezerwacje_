import React, {Component} from "react";
import hotels from "../../data/Hotel";
export default class ReservationListElement extends Component{

    constructor(props) {
        super(props);
        this.state= {
            hotel: []
        }
    }


    componentDidMount() {
        this.setState({
            hotel: hotels[this.props.res.hotelID]
        })
    }

    getCost(){
        const dt1 = new Date(this.props.res.start);
        const dt2 = new Date(this.props.res.end);
        const diffDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));

        return(  diffDays * this.state.hotel.cost * this.props.res.rooms);
    }


    deleteReservation(){

            this.props.res.cancelled = true;
            this.props.refresh();


    }


    render(){
        return(
            <tr className={'resListEle'}>
                <td>{this.state.hotel.name}</td>
                <td>{this.state.hotel.city}, {this.state.hotel.country}</td>
                <td>{this.props.res.start}</td>
                <td>{this.props.res.end}</td>
                <td>{this.getCost()} zł</td>
                <td>{this.props.res.rooms}</td>
                <td className='actionCell' onClick={()=>this.deleteReservation()}>Cancel</td>
            </tr>
        )
    }
}