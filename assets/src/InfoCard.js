import React, {PropTypes, Component} from 'react';

export default class InfoCard extends Component {
  static propTypes = {
    departureTime: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    arriveTime: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  };

  render() {
    const {departureTime, duration, arriveTime, width} = this.props;
    return (
      <div style={{width:width+'px', textAlign:'center'}}>
        {arriveTime}<br />
        <h3>{duration} s</h3>
      </div>
    )
  }
}