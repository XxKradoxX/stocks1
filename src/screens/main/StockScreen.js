import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { connect } from 'react-redux';
import { 
  getCompany, 
  listTransactionsByCompany, 
  listTransactionsByUser,

} from '../../actions/stocks';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

import moment from 'moment';
import 'moment-timezone';

import LineChartComponent from '../../components/LineChartComponent';

let chartData = [];
let chartDataLastRealIndex = 0;
let timeOut = 200;
let localTransactions = [];
const contentInset = { top: 20, bottom: 20 }
const isWithinInc = (a, b, inc) => { 
  return Math.abs(a.diff(b)) < inc ? true : false;
}

class StockScreen extends Component {

  render() {    
    return(
      <View style={ styles.container }>
          <LineChartComponent companyId="tsla"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 25,
        height: 200,
    },
});

const mapStateToProps = state => {
    return {
      userId: state.auth.id,
      myTransactions: state.stocks.myTransactions,
      currentTransactions: state.stocks.currentTransactions,
      gt: state.stocks.gt,
    };
};

export default connect(mapStateToProps, { getCompany, listTransactionsByCompany, listTransactionsByUser })(StockScreen);