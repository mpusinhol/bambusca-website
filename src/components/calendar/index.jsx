import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'reactstrap';
import BigCalendar from "react-big-calendar";
import moment from "moment";

import * as FontAwesome from 'react-icons/fa'

import "react-big-calendar/lib/css/react-big-calendar.css";

//require('globalize/lib/cultures/globalize.culture.fr');

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

        {Object.keys(this.props.viajanet.bestPrices).map(key => (
            
            (
                mydate = moment(key, 'DD/MM/YYYY'),
                moment(mydate).format("MM/DD/YYYY"),
                newArray.push({
                    start: new Date(mydate),
                    end: new Date(mydate),
                    price: bestPrices[key].BestPrice.Value,
                    initialDate: key
                })
            )

         ))}

         console.log(newArray)

         console.log(newArray[0].start);

          this.state = {
            //month, day, year
            //mês que o calendario deve exibir
            date: new Date(newArray[0].start),
            newArray: newArray,
        }
    }

    MyDateCell = props => {
        return (
            <div className="cell-content">

                <div className="price">
                    R$ {props.event.price}
                </div>

                <div className="informations">
                    <div className="date">
                        Volta
                        <br />
                        {moment(props.event.endDate).locale('pt-br').format("D/MMM")}
                    </div>

                    <div className="date mini-calendar">
                        {props.event.amountDays}
                        <br />
                        Dias
                    </div>
                </div>


            </div>


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

                        <div className="actual-month">Atual</div>

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