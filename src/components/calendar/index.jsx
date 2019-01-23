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

import fetchBestPrices from '../../helpers/viajanetHelper';

import {
    getBestPriceTrip,
    onGetBestPriceSuccess,
    onGetBestPriceFailure,
    onGetAllBestPrices
  } from '../../actions/viajanetActions';
import { saveRequestFormData } from '../../actions/requestActions';

moment.locale('pt-br');
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: undefined,
            calendarDataArray: [],
            highestPriceDate: "",
            lowestPriceDate: "",
            daysWithPrice: [],
        };

        this.onMonthClicked = this.onMonthClicked.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.request && nextProps.viajanet && nextProps.viajanet.bestPrices &&
                nextProps.request.month !== undefined && nextProps.request.year !== undefined) {
            console.log('nextProps: ', nextProps.request);
            const keyMonth = `${nextProps.request.month + 1}/${nextProps.request.year}`;

            console.log('keyMonth: ', keyMonth);

            let prices = Object.assign({}, nextProps.viajanet.bestPrices[keyMonth]);
            let highestPriceDate = nextProps.viajanet.bestPrices[keyMonth].highestPriceDate;
            let lowestPriceDate = nextProps.viajanet.bestPrices[keyMonth].lowestPriceDate;

            delete prices.lowestPriceDate;
            delete prices.highestPriceDate;
            delete prices.numberOfResultsFound;

            let daysWithPrice = [];

            const calendarDataArray = Object.values(prices).map(item => {
                
                const departureDate = moment(item.Departure, 'YYYY-MM-DD');
                const formattedDate = moment(departureDate).format("MM/DD/YYYY");
                daysWithPrice.push(new Date(formattedDate).getDate());

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
                    isHighest: item.FullPriceTotal === nextProps.viajanet.bestPrices[keyMonth][highestPriceDate].FullPriceTotal,
                    isLowest: item.FullPriceTotal === nextProps.viajanet.bestPrices[keyMonth][lowestPriceDate].FullPriceTotal
                }
            })
            const splitDate = keyMonth.split('/');
            this.setState({
                date: new Date(splitDate[1], splitDate[0] - 1, 1),
                calendarDataArray,
                highestPriceDate: nextProps.viajanet.bestPrices[keyMonth].highestPriceDate,
                lowestPriceDate: nextProps.viajanet.bestPrices[keyMonth].lowestPriceDate,
                daysWithPrice,
            })
        }
    }

    getColor(lowest, highest) {
        if (lowest) {
            return '#32CD32';
        } else if (highest) {
            return '#b20000';
        } else {
            return '#000000'
        }
    }

    MyDateCell = props => {
        return (
            <a href="https://www.w3schools.com/html/" target="_blank" rel="noopener noreferrer" >
                <div className="cell-content">

                    <div className="price" style={{
                        // fontSize: props.event.isRoundTrip ? '28px' : '32px',
                        color: this.getColor(props.event.isLowest, props.event.isHighest),
                    }}>
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

    onMonthClicked(event) {
        let date;

        if (event.target.id === "previous")
            date = moment(this.state.date).subtract(1, 'months');
        else
            date = moment(this.state.date).add(1, 'months');

        const requestData = {
            originIATA: this.props.request.originIATA,
            destinationIATA: this.props.request.destinationIATA,
            isRoundTrip: this.props.request.isRoundTrip,
            month: moment(date).get('month'),
            year: this.props.request.year,
            minDays: this.props.request.minDays,
            maxDays: this.props.request.maxDays,
            adults: this.props.request.adults,
            children: this.props.request.children,
            babies: this.props.request.babies
          }

        const promises = fetchBestPrices(requestData);

        promises.then(results => {
            this.props.actions.onGetAllBestPrices(results, date.format('M/YYYY'));
            this.props.actions.saveRequestFormData(requestData);
        });
    }

    render() {
        if (this.state.calendarDataArray.length > 0) {
            const components = {
                eventWrapper: this.MyDateCell
            };
            const customDayPropGetter = (date) => {

                if(!this.state.daysWithPrice.includes(date.getDate())) {
                    return {
                        className: 'rbc-off-range-bg',
                    };
                } else {
                    return {};
                }

            };

            return (
                <div>
                    <div>
                        <div className="month">
                            <Button color="link" id="previous" onClick={this.onMonthClicked}>Anterior</Button>
                            
                            <FontAwesome.FaAngleLeft />

                            <div className="actual-month">{moment(this.state.date).locale('pt-br').format("MMMM")}</div>

                            <FontAwesome.FaAngleRight />

                            <Button color="link" id="next" onClick={this.onMonthClicked}>Próximo</Button>
                        </div>
                    </div>

                    <div className="calendar">
                        {/* Se for usar a data atual, não passar date e nem onNavigate 
                    Localizer é obrigatório
                */}
                        <BigCalendar
                            localizer={localizer}
                            date={this.state.date}
                            // onNavigate={date => this.setState({ date })}
                            popup
                            components={components}
                            defaultDate={this.state.date}
                            events={this.state.calendarDataArray}
                            // onSelectEvent={this.openEvent}
                            view={'month'}
                            views={['month']}
                            toolbar={false}
                            defaultView='month'
                            dayPropGetter={customDayPropGetter}
                        />
                    </div>
                    <div className="div-aditional-informations">
                        <p className="aditional-informations-tax">*Taxas e encargos inclusos</p>
                        <p className="aditional-informations-price">*Preço por adulto</p>
                    </div>

                </div>
            );
        } else {
            return null;
        }

    }
}

function mapStateToProps(state) {
    return {
        viajanet: state.Viajanet,
        request: state.Request
    };
};

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(Object.assign({}, {
        getBestPriceTrip,
        onGetBestPriceSuccess,
        onGetBestPriceFailure,
        onGetAllBestPrices,
        saveRequestFormData,
      }), dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);