import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import events from "./events";
import Calendar from "react-big-calendar";
import moment from "moment";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

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
                <Calendar
                    popup
                    components={components}
                    defaultDate={new Date()}
                    events={events}
                    onSelectEvent={this.openEvent}
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