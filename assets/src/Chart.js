import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import { BarChart, d3 } from 'react-d3-components';

export default class Chart extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  render() {
    const {data} = this.props;
    if( !data.hasOwnProperty('success') ) 
      return (<div>no data...</div>)
    else if(data.success === false)
      return (<div>api failed : {data.message}</div>)
    else {
      let chartData = [{label:'traffic', values:[]}]
      chartData[0].values = data.message.map(function(obj) {
        //moment.duration(obj.duration.value, "seconds").humanize()
        if(!obj.hasOwnProperty('duration_in_traffic'))
          return {x:obj.time, y:obj.duration.value}
        else
          return {x:obj.time, y:obj.duration_in_traffic.value}
      });
      //console.log(chartData);

      // var demoData = [{
      //     label: 'somethingA',
      //     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
      // }];
      console.log(d3);
      var tooltip = function(x, y0, y, total) {
        console.log('-----'+moment.duration(y, "seconds").humanize()+'-----');
    	  return moment.duration(y, "seconds").humanize();
    	};
      return(
        <BarChart
          data={chartData}
          width={800}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          tooltipHtml={tooltip}
          // color scale : http://synthesis.sbecker.net/articles/2012/07/16/learning-d3-part-6-scales-colors
          // colorByLabel={false}
          colorScale={ d3.scale.linear()
            .domain([0, 800])
            .range([0,400])
          }
          // fill={"teal"}
          barPadding={0.4}
        />
      )
    }
  }
}
