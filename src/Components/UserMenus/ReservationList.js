import React, {Component} from "react";
import reserv from  "../../data/reservations";
import hotels from "../../data/Hotel";
import ReservationListElement from "./ReservationListElement";
export default class ReservationList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            resDB: reserv,
            res: [],
            sortBy:-1,
        }
        this.changeSort = this.changeSort.bind(this);
        this.getRes = this.getRes.bind(this);
    }

    getRes(){
        const r = this.state.resDB.filter(r => r.userID === this.props.userID && !r.cancelled);
        this.setState({
            res: r
        })
    }

    componentDidMount() {
        this.getRes();
    }



    getHotel(id){
        return hotels[id];
    }




    changeSort(i){
        if(i === this.state.sortBy){
            const newR = this.state.res.reverse();
            this.setState({
                res: newR,
                sortBy: -i,
            })
        }
        else{
            const newR = this.state.res.sort(this.sortMethod[i]);
            this.setState({
                res: newR,
                sortBy: i,
            })
        }
    }
    sortLoc(a, b){return hotels[b.hotelID].city -hotels[a.hotelID].city; }
    sortHotel(a, b){return hotels[b.hotelID].name - hotels[a.hotelID].name;}
    sortStart(a, b){return b.start - a.start}
    sortEnd(a, b){return b.end - a.end}
    sortCost(a, b){
        const adt1 = new Date(a.start);
        const adt2 = new Date(a.end);
        const adiffDays = Math.floor((Date.UTC(adt2.getFullYear(), adt2.getMonth(), adt2.getDate()) - Date.UTC(adt1.getFullYear(), adt1.getMonth(), adt1.getDate()) ) /(1000 * 60 * 60 * 24));
        const aco = adiffDays * hotels[a.hotelID].cost * a.rooms;
        const bdt1 = new Date(b.start);
        const bdt2 = new Date(b.end);
        const bdiffDays = Math.floor((Date.UTC(bdt2.getFullYear(), bdt2.getMonth(), bdt2.getDate()) - Date.UTC(bdt1.getFullYear(), bdt1.getMonth(), bdt1.getDate()) ) /(1000 * 60 * 60 * 24));
        const bco = bdiffDays * hotels[b.hotelID].cost * b.rooms;
        return bco - aco;
    }


    sortMethod= [this.sortHotel, this.sortLoc, this.sortStart,this.sortEnd,this.sortCost];

    info(){
        if(this.props.new !== undefined){
            return(
                <div className='info'>
                    New reservation created successfully!
                </div>
            )
        }
    }

    render(){
        const res = this.state.res.reverse().map(r => <ReservationListElement key={r.id} res={r} refresh={this.getRes}/>);
        return(
            <div>
                <p>Reservations</p><hr/>
                {this.info()}
                <table className={'resT'}><tbody>
                <tr>
                    <th onClick={() => this.changeSort(0)}>Hotel</th>
                    <th onClick={() => this.changeSort(1)} >Location</th>
                    <th onClick={() => this.changeSort(2)}>Start Date</th>
                    <th onClick={() => this.changeSort(3)}>End Date</th>
                    <th onClick={() => this.changeSort(4)}>Cost</th>
                    <th>Rooms</th>
                    <th>Action</th>
                </tr>
                    {res}
                </tbody></table>
            </div>
        )
    }
}