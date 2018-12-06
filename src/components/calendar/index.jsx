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
            date: new Date('11/11/2018')
        }

        console.log(localizer);
        console.log(moment().month("January"));
        console.log(this.state.date)
    }

    MyDateCell = props => {
        console.log(props);
        return (
            <span>
                {props.event.title}
                <br />
            </span>
        );
    };

    render() {
        const components = {
            eventWrapper: this.MyDateCell
        };
        return (
            <div className="calendar">
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