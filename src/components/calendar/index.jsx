import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import events from "./events";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
require('globalize/lib/cultures/globalize.culture.fr');

const localizer = BigCalendar.momentLocalizer(moment) 

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
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
                    popup
                    components={components}
                    defaultDate={new Date()}
                    events={events}
                    onSelectEvent={this.openEvent}
                    culture={'fr'}
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