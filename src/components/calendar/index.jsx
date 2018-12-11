import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import events from "./events";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

//require('globalize/lib/cultures/globalize.culture.fr');

moment.locale('pt-BR');
const localizer = BigCalendar.momentLocalizer(moment); 

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //month, day, year
            date: new Date('12/12/2018')
        }
    }

    MyDateCell = props => {
        console.log(props);
        return (
            <div className="encapsulated">

                <div className="price">
                    R$ {props.event.price}
                </div>
                
                <div className="date">
                    Ida: {props.event.initialDate}
                </div>
                
                <div className="date">
                    Volta: {props.event.endDate}
                </div>
                
            </div>
                

        );
    };

    render() {
        const components = {
            eventWrapper: this.MyDateCell
        };
        return (
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
                    events={events}
                    // onSelectEvent={this.openEvent}
                    view={'month'}
                    views={['month']}
                    toolbar={false}

                    // eventPropGetter={
                    //     (event, start, end) => {
                    //       let newStyle = {
                    //         backgroundColor: "blue",  
                    //         color: '#9ACD32',
                    //         borderRadius: "0px",
                    //         border: "none"
                    //       };
                    
                    //       return {
                    //         className: "",
                    //         style: newStyle
                    //       };
                    //     }
                    //   }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.Example
    };
};

export default connect(mapStateToProps)(App);