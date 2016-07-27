import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import AppBar from 'material-ui/AppBar';
import FunctionalBar from './FunctionalBar';
import Chart from './Chart';
import {fetchDirections} from '../actions';

import DateTimeField from 'react-bootstrap-datetimepicker';


class Main extends React.Component {
  
  static propTypes = {
    // ui state
    date: PropTypes.string.isRequired,
    beginTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    reduxState: PropTypes.object,

    // response data
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    const {date, beginTime, endTime, origin, destination} = this.props;
    this.props.dispatch(fetchDirections(origin, destination, date, beginTime, endTime));
  }

  render() {
    const { reduxState } = this.props;
    return(
      <div className="container-fluid">
        <h1>Pig Jam</h1>
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <FunctionalBar />
          </div>
          <div className="col-xs-12 col-md-8">
            <Chart data={this.props.data} />
            {/*
              <pre>
            redux state = { JSON.stringify(reduxState, null, 2) }
            </pre>
            */}
            
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {directions, ui} = state
  return {
    data: directions.data,
    //
    date: ui.date,
    beginTime: ui.beginTime,
    endTime: ui.endTime,
    origin: ui.origin,
    destination: ui.destination,
    reduxState: state
  }
}

export default connect(mapStateToProps)(Main)