import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginMessage from '../reusable/LoginMessage'
import Chart from './Chart'

class PieChart extends Component {

  render() {
    const { id } = this.props.match.params;
    const ChartView = this.props.surveys == null ? 
      <LoginMessage /> : 
      <Chart id={id} surveys={this.props.surveys} 
        userData={this.props.userData} />;
    return (
      <div>
        {ChartView}
      </div>
    )
  }
}

const mapStateToProps = ({ surveys, userData }) => ({ surveys, userData})
export default connect(mapStateToProps, null)(PieChart);