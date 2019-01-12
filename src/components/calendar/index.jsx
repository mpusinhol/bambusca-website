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

        this.state = {
            date: undefined,
            calendarDataArray: [],
            highestPriceDate: "",
            lowestPriceDate: "",
        };
    }

    // onMonthClicked(nextDate) {
    //     const errors = this.validateFields();

    //       this.setState({isProcessing: true});

    //       const promises = fetchBestPrices({
    //         originIATA: this.state.calendarDataArray[0].origin,
    //         destinationIATA: this.state.calendarDataArray[0].destination,
    //         isRoundTrip: this.state.calendarDataArray[0].isRoundTrip,
    //         month: this.state.month,
    //         year: this.state.year,
    //         // minDays: this.state.minDays,
    //         // maxDays: this.state.maxDays,
    //       });

    //       promises.then(results => {
    //         this.props.actions.onGetAllBestPrices(results);
    //       });
    //   }

    componentWillReceiveProps(nextProps) {
        if (nextProps.request && nextProps.viajanet && nextProps.viajanet.bestPrices) {
            const keyMonth = `${nextProps.request.month + 1}/${nextProps.request.year}`;
            let prices = Object.assign({}, nextProps.viajanet.bestPrices[keyMonth]);

            delete prices.lowestPriceDate;
            delete prices.highestPriceDate;
            delete prices.numberOfResultsFound;

            const calendarDataArray = Object.values(prices).map(item => {
                const departureDate = moment(item.Departure, 'YYYY-MM-DD');
                const formattedDate = moment(departureDate).format("MM/DD/YYYY");

                return {
                    start: new Date(formattedDate),
                    end: new Date(formattedDate),
                    price: item.FullPriceTotal,
                    amountDays: item.TripDays,
                    initialDate: departureDate,
                    endDate: item.Arrival,
                    isRoundTrip: item.IsRoundTrip,
                    taxAndFee: item.BestPrice.Tax + item.BestPrice.Fee,
                    origin: item.Origin,
                    destination: item.Destination,
                    tripDays: item.TripDays,
                    // isHighest: item.date == nextProps.viajanet.bestPrices[keyMonth].highest
                }
            })

            this.state = {
                date: new Date(`1/${keyMonth}`),
                calendarDataArray,
                highestPriceDate: nextProps.viajanet.bestPrices[keyMonth].highestPriceDate,
                lowestPriceDate: nextProps.viajanet.bestPrices[keyMonth].lowestPriceDate,
            }

        }
    }

    MyDateCell = props => {
        console.log('MyDateCell');
        return (
            <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" >
                <div className="cell-content">

                    <div className="price" style={{ fontSize: props.event.isRoundTrip ? '28px' : '32px' }}>
                        R$ {props.event.price}
                        {/* <p className="tax">Taxas e encargos inclusos</p> */}
                    </div>

                    <div className="informations" style={{ display: props.event.isRoundTrip ? 'flex' : 'none' }}>
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
        if (this.state.calendarDataArray.length > 0) {
            console.log('State Dentro do Render', this.props.request);
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
                            events={this.state.calendarDataArray}
                            // onSelectEvent={this.openEvent}
                            view={'month'}
                            views={['month']}
                            toolbar={false}
                        />
                    </div>
                    <div className="div-adirional-informations">
                        <p className="aditional-informations">*Taxas e encargos inclusos</p>
                        <p className="aditional-informations">*Preço por adulto</p>
                    </div>

                </div>
            );
        } else {
            return null;
        }

    }
}

function mapStateToProps(state) {
    console.log('State: ', state);
    return {
        viajanet: state.Viajanet,
        request: state.Request
    };
};

export default connect(mapStateToProps)(App);