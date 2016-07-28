import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import { BarChart, d3 } from 'react-d3-components';
import {ResponsiveBarChart, ResponsiveAreaChart, ResponsiveLineChart} from './ResponsiveChart';
import Info from './Info';

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
        let departureTime = moment(obj.time, "YYYYMMDDHHmm").format("HH:mm");
        if(!obj.hasOwnProperty('duration_in_traffic'))
          return {x:departureTime, y:obj.duration.value}
        else
          return {x:departureTime, y:obj.duration_in_traffic.value}
      });

      let displayData = [];
      displayData = data.message.map(function(obj) {
        let duration = 0; // s
        let departureTime = moment(obj.time, "YYYYMMDDHHmm");
        if(!obj.hasOwnProperty('duration_in_traffic')) {
          return {
            departureTime: moment(departureTime).format("YYYY-MM-DD HH:mm"),
            duration: obj.duration.value,
            arriveTime: moment(departureTime).add(obj.duration.value, "seconds").format("YYYY-MM-DD HH:mm")
          }
        }
        else {
          return {
            departureTime: moment(departureTime).format("YYYY-MM-DD HH:mm"),
            duration: obj.duration_in_traffic.value,
            arriveTime: moment(departureTime).add(obj.duration_in_traffic.value, "seconds").format("YYYY-MM-DD HH:mm")
          }
        }
      });

      console.log(displayData);
      

      

      // var demoData = [{
      //     label: 'somethingA',
      //     values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
      // }];
      var tooltip = function(x, y0, y, total) {
        // console.log('-----'+moment.duration(y, "seconds").humanize()+'-----');
    	  return moment.duration(y, "seconds").humanize();
    	};
      return(
        <div style={{width:'100%', height:'200px'}}>
          <Info data={displayData} />
          <div style={{}}>
            <ResponsiveBarChart
              data={chartData}
              //width={800}
              //height={400}
              //margin={{top: 10, bottom: 50, left: 50, right: 10}}
              tooltipHtml={tooltip}
              // color scale : http://synthesis.sbecker.net/articles/2012/07/16/learning-d3-part-6-scales-colors
              // colorByLabel={false}
              //colorScale={ d3.scale.linear()
              //  .domain([0, 800])
              //  .range([0,400])
              //}
              // fill={"teal"}
              barPadding={0.3}
            />
          </div>
        </div>
      )
    }
  }
}
