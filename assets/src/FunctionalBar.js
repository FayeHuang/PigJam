import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import DateTimeField from 'react-bootstrap-datetimepicker';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchDirections,
  changeDepartureDate,
  changeBeginTime,
  changeEndTime,
  changeOriginPlace,
  changeDestinationPlace
} from '../actions'

class FunctionBar extends React.Component {
  
  static propTypes = {
    date: PropTypes.object.isRequired,
    beginTime: PropTypes.object.isRequired,
    endTime: PropTypes.object.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  };


  handleBeginTimeChange = (newDate) => {
    console.log("newBeginTime", newDate);
    this.props.dispatch(changeBeginTime(moment(newDate,"YYYYMMDDHHmm")))
    // return this.setState({beginTime: newDate});
  };

  handleEndTimeChange = (newDate) => {
    console.log("newEndTime", newDate);
    this.props.dispatch(changeEndTime(moment(newDate,"YYYYMMDDHHmm")))
    // return this.setState({endTime: newDate});
  };

  handleOriginChange = (e) => {
    this.props.dispatch(changeOriginPlace(e.target.value))
    // return this.setState({ origin: e.target.value });
  };

  handleDestinationChange = (e) => {
    this.props.dispatch(changeDestinationPlace(e.target.value))
    // return this.setState({ destination: e.target.value });
  };

  handelPrimaryButtonClick = () => {
    console.log('botton click');
    const {origin, destination, beginTime, endTime} = this.props;
    this.props.dispatch(fetchDirections(origin, destination, beginTime, endTime));
  };


  render() {
    const {date, beginTime, endTime, origin, destination} = this.props
    return(
      <div>
        <FormGroup
          controlId="formBasicText"
          //validationState={this.getValidationState()}
        >
          <ControlLabel>地點</ControlLabel>
          <FormControl
            type="text"
            value={origin}
            placeholder="from..."
            onChange={this.handleOriginChange}
          />
          <FormControl
            type="text"
            value={destination}
            placeholder="to..."
            onChange={this.handleDestinationChange}
          />
        </FormGroup>
        
        <FormGroup
          controlId="formBasicText"
          //validationState={this.getValidationState()}
        >
          <ControlLabel>預計出發時間</ControlLabel>
          <DateTimeField 
            dateTime={moment(beginTime).format("YYYYMMDDHHmm")}
            //mode="time" 
            format="YYYYMMDDHHmm"
            inputFormat="YYYY/MM/DD dddd HH:mm"
            onChange={this.handleBeginTimeChange}
            size="sm"
          />
          <DateTimeField 
            dateTime={moment(endTime).format("YYYYMMDDHHmm")}
            //mode="time" 
            format="YYYYMMDDHHmm"
            inputFormat="YYYY/MM/DD dddd HH:mm"
            onChange={this.handleEndTimeChange}
            size="sm"
          />
        </FormGroup>
        <Button 
          bsStyle="primary"
          onClick={this.handelPrimaryButtonClick}
        >
          預報
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {ui} = state;
  return {
    date: ui.date,
    beginTime: ui.beginTime,
    endTime: ui.endTime,
    origin: ui.origin,
    destination: ui.destination
  }
}

export default connect(mapStateToProps)(FunctionBar)