import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import { BarChart } from 'react-d3-components';

export default class Chart extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  render() {
    const {data} = this.props;
    if( !data.hasOwnProperty('success') || data.success === false ) 
      return (<div>no data...</div>)
    else {
      let chartData = [{label:'traffic', values:[]}]
      chartData[0].values = data.message.map(function(obj) {
        //moment.duration(obj.duration.value, "seconds").humanize()
        return {x:obj.time, y:obj.duration.value}
      });
      //console.log(chartData);

      // var demoData = [{
      //     label: 'somethingA',
      //     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
      // }];

      let tooltipScatter = function(x, y) {
          return moment.duration(y, "seconds").humanize();
      };
      return(
        <BarChart
          data={chartData}
          width={400}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={tooltipScatter}
        />
      )
    }
  }
}
