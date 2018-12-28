import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'reactstrap';
import BigCalendar from "react-big-calendar";
// import moment from "moment";

import * as moment from 'moment';
import * as locales from 'moment/min/locales';

import * as FontAwesome from 'react-icons/fa'

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('pt-br');
const localizer = BigCalendar.momentLocalizer(moment);

class App extends Component {
    constructor(props) {
        super(props);

        const bestPrices = this.props.viajanet.bestPrices;
        const newArray = [];
        var mydate = '';

        console.log("BestPrice Original")
        console.log(bestPrices)

        {
            Object.keys(this.props.viajanet.bestPrices).map(key => (

                (
                    mydate = moment(key, 'DD/MM/YYYY'),
                    moment(mydate).format("MM/DD/YYYY"),
                    newArray.push({
                        start: new Date(mydate),
                        end: new Date(mydate),
                        price: bestPrices[key].FullPriceTotal,
                        amountDays: bestPrices[key].TripDays,
                        initialDate: key,
                        endDate: bestPrices[key].Arrival,
                        isRoundTrip: bestPrices[key].IsRoundTrip,
                        taxAndFee: bestPrices[key].BestPrice.Tax + bestPrices[key].BestPrice.Fee,
                    })
                )

            ))
        }

        this.state = {
            date: new Date(newArray[0].start),
            newArray: newArray,
        }
    }

    MyDateCell = props => {
        return (
            <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" >
                <div className="cell-content">

                    <div className="price" style={{fontSize: props.event.isRoundTrip ? '28px' : '32px' }}>
                        R$ {props.event.price}
                        {/* <p className="tax">Taxas e encargos inclusos</p> */}
                    </div>

                    <div className="informations" style={{display: props.event.isRoundTrip ? 'flex' : 'none' }}>
                        <div className="date">
                            Volta
                        <br />
                            {moment(props.event.endDate).locale('pt-br').format("DD/MMM")}
                        </div>

                        <div className="date mini-calendar">
                            {props.event.amountDays}
                            <br />
                            Dias
                        </div>
                    </div>

                </div>
            </a>

        );
    };

    render() {
        const components = {
            eventWrapper: this.MyDateCell
        };
        return (

            <div>
                <div>
                    <div className="month">
                        <Button color="link">Anterior</Button>

                        <FontAwesome.FaAngleLeft />

                        <div className="actual-month">{moment(this.state.date).locale('pt-br').format("MMMM")}</div>

                        <FontAwesome.FaAngleRight />

                        <Button color="link">Próximo</Button>
                    </div>

                    {/* <div className="day-week">
                       <span>Dom</span>
                       <span>Seg</span>
                       <span>Ter</span>
                       <span>Qua</span>
                       <span>Qui</span>
                       <span>Sex</span>
                       <span>Sáb</span>
                    </div> */}
                </div>

                <div className="calendar">
                    {/* Se for usar a data atual, não passar date e nem onNavigate 
                Localizer é obrigatório
            */}
                    <BigCalendar
                        localizer={localizer}
                        date={this.state.date}
                        onNavigate={date => this.setState({ date })}
                        popup
                        components={components}
                        defaultDate={this.state.date}
                        events={this.state.newArray}
                        // onSelectEvent={this.openEvent}
                        view={'month'}
                        views={['month']}
                        toolbar={false}
                    />
                </div>
                <p className="aditional-informations">*Taxas e encargos inclusos</p>
                <p className="aditional-informations">*Preço por adulto</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        viajanet: state.Viajanet,
    };
};

export default connect(mapStateToProps)(App);