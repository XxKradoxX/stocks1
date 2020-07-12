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

let chartData = [];
let chartDataLastRealIndex = 0;
let timeOut = 200;
let localTransactions = [];
const contentInset = { top: 20, bottom: 20 }
const isWithinInc = (a, b, inc) => { 
  return Math.abs(a.diff(b)) < inc ? true : false;
}

const fill = (nextClosingTransaction, previousClosingTransaction, inc) => { // Fills (gap between previous and new Closing Transactions) + (nextClosingTransaction)
  
  let t = previousClosingTransaction.momentCreatedAt.clone();
  let currentClosingPricePerUnit = previousClosingTransaction.price/previousClosingTransaction.units;
  
  if (nextClosingTransaction == null) {
    const numIncs = Math.floor(moment().diff(t)/inc);
    const ix = chartData.length-1;
    for (let i = 0; i < numIncs; i++) {
      
      chartData.push(currentClosingPricePerUnit);
    }
    return ix;
  }

  const numIncs = Math.abs(Math.floor(moment(nextClosingTransaction.createdAt).diff(t)/inc)); // Floor and abs just in case
  const finalClosingTransactionPerUnit = nextClosingTransaction.price/nextClosingTransaction.units;
  let gradient = null
  if (currentClosingPricePerUnit == 0) {
    gradient=0;
  } else {
    gradient = (finalClosingTransactionPerUnit-currentClosingPricePerUnit)/numIncs;
    gradient = isNaN(gradient) ? 0 : gradient;
  }

  for (let i = 0; i < numIncs; i++) {
    currentClosingPricePerUnit += gradient;
    chartData.push(currentClosingPricePerUnit);
  }
  return t.add(numIncs*inc, "milliseconds");
}

const transactionsToChartData = ( oldTransactions, newTransactions, gt ) => {
  // 1d: 1/15m = 96 pts
  // 1w: 1/2h = 84 pts
  // 1m: 1/8h ~ 93 pts
  // 6m: 1/2d ~ 93 pts
  // 1y: 1/2d ~ 186 pts 

  if (chartData.length > 0) {
    chartData.splice(chartDataLastRealIndex+1, chartData.length - (chartDataLastRealIndex+1));
  }

  let previousClosingTransaction = null;
  let i = 0;
  if (oldTransactions.length == 0) // Inital data
  { 
    const threshold = moment().subtract(gt.quantity, gt.units);
    while (i < newTransactions.length && threshold.isAfter(moment(newTransactions[i].createdAt))) {
      i++;
    }
    if (i > 0) {
      previousClosingTransaction = {
        momentCreatedAt: moment().subtract(gt.quantity, gt.units),
        price: newTransactions[i-1].price,
        units: newTransactions[i-1].units
      }
    } else {
      i = -1;
      previousClosingTransaction = {
        momentCreatedAt: moment().subtract(gt.quantity, gt.units),
        price: 0,
        units: 1,
      }
    }
  } 
  else 
  {    
    i = oldTransactions.length-1;
    previousClosingTransaction = {
      momentCreatedAt: moment(oldTransactions[i].createdAt),
      price: oldTransactions[i].price,
      units: oldTransactions[i].units,
    }
  }
  let inc = null; // in milliseconds
  switch (gt.units) {
    case "days": {
      inc = 1000 * 60 * 15; // 15m in ms
      break;
    }
    case "weeks": {
      inc = 1000 * 60 * 60 * 2; // 2 hours in ms
      break;
    }
    case "months": {
      inc = 1000 * 60 * 60 * 8; // 8 day / 2d in ms
      break;
    }
    case "years": {
      inc = 1000 * 60 * 60 * 24 * 2; // 2 days in ms
      break;
    }
  }
  let priceChanged = false;
  while (i < newTransactions.length) // Group transactions to increments and finds closing Transaction for each group
  {
    i++;
    while (i < newTransactions.length && isWithinInc(previousClosingTransaction.momentCreatedAt, moment(newTransactions[i].createdAt), inc)) // Find closing transaction for current increment
    { 
      priceChanged = true;
      i++;
    }
    const safeIndex = i < newTransactions.length ? i : i-1;
    const nextClosingTime = fill(newTransactions[safeIndex], previousClosingTransaction, inc); // Fills gaps between previous and new Closing transactions
    previousClosingTransaction = { // Update previous Closing Transaction
      momentCreatedAt: nextClosingTime,
      price: newTransactions[safeIndex].price,
      units: newTransactions[safeIndex].units,
    } 
  }
  if (!priceChanged) { // In case price is completely stagnant
    chartDataLastRealIndex = fill(null, previousClosingTransaction, inc);
  }
  localTransactions = newTransactions.slice(); //CAUSE OF ERROR
}

class StockScreen extends Component {

  componentDidMount() {
    // Display Loading
    // this.props.getCompany("tsla");
    this.props.listTransactionsByCompany("tsla", { quantity: 1, units: 'months' });
    //this.props.listTransactionsByUser(this.props.userId, "tsla");

    this.interval = setInterval(
    () => {
      timeOut--;
      if (this.props.currentTransactions.length > 0) {
        this.props.listTransactionsByCompany("tsla", null, this.props.currentTransactions[this.props.currentTransactions.length-1].createdAt);
      }

      if (timeOut == 0) {
        clearInterval(this.interval);
      }
      
    },
    5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.props.gt != null) {
      transactionsToChartData(localTransactions, this.props.currentTransactions, this.props.gt);
      
      console.log(chartData);
    }

    
    return(
      <View style={ styles.container }>
        <YAxis
        style={{ height: 200 }}
        data={chartData}
        contentInset={contentInset}
        svg={{
            fill: 'grey',
            fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
        />
        <LineChart
        style={{ flex: 1, marginLeft: 16, height: 200 }}
        data={chartData}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}>
        <Grid />
        </LineChart>
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