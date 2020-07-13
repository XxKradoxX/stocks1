import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

import moment from 'moment';
import 'moment-timezone';

let chartDataLastRealIndex = 0;
let timeOut = 200;
let localTransactions = [];
const contentInset = { top: 20, bottom: 20 }

import { API, graphqlOperation } from "@aws-amplify/api";
import { 
    listTransactionsByCompanyQuery,
} from '../graphql/queries';


const isWithinInc = (a, b, inc) => { 
  return Math.abs(a.diff(b)) < inc ? true : false;
}

const fill = (chartData, nextClosingTransaction, previousClosingTransaction, inc) => { // Fills (gap between previous and new Closing Transactions) + (nextClosingTransaction)
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
  if (gradient == 0) {
    chartData[chartData.length-1] = finalClosingTransactionPerUnit;
  }
  //chartData.push(finalClosingTransactionPerUnit);
  return t.add(numIncs*inc, "milliseconds");
}

const listTransactionsByCompany = ( id, gt, lastTransactionDateString=null ) => {
    if (lastTransactionDateString) {
        return API.graphql(graphqlOperation(listTransactionsByCompanyQuery, 
        { 
            id: id, 
            gt: lastTransactionDateString
        }));
    } 
    return API.graphql(graphqlOperation(listTransactionsByCompanyQuery, 
    { 
        id: id, 
        gt: gt ? moment().subtract(gt.quantity, gt.units).toISOString() : moment(0).toISOString()
    }));
}

class LineChartComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            gt: props.gt == null ?{ quantity: 1, units: 'months' } : gt,
        };
    }

    transactionsToChartData(oldTransactions, newTransactions, gt) {
        // 1d: 1/15m = 96 pts
        // 1w: 1/2h = 84 pts
        // 1m: 1/8h ~ 93 pts
        // 6m: 1/2d ~ 93 pts
        // 1y: 1/2d ~ 186 pts 

        let newChartData = this.state.chartData.length> 0 ? this.state.chartData.slice() : [];
        if (this.state.chartData.length > 0) {
            newChartData.splice(chartDataLastRealIndex+1, newChartData.length - (chartDataLastRealIndex+1));
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
          i = 0;
          const lastIndx = oldTransactions.length-1;
          previousClosingTransaction = {
            momentCreatedAt: moment(oldTransactions[lastIndx].createdAt),
            price: oldTransactions[lastIndx].price,
            units: oldTransactions[lastIndx].units,
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
          const nextClosingTime = fill(newChartData, newTransactions[safeIndex], previousClosingTransaction, inc); // Fills gaps between previous and new Closing transactions
          previousClosingTransaction = { // Update previous Closing Transaction
            momentCreatedAt: nextClosingTime,
            price: newTransactions[safeIndex].price,
            units: newTransactions[safeIndex].units,
          } 
        }

        if (!priceChanged) { 
          chartDataLastRealIndex = fill(newChartData, null, previousClosingTransaction, inc);
        }
        localTransactions = newTransactions.slice(); 
        this.setState({chartData: newChartData});
    }

    componentDidMount() {
        this.interval = setInterval(
        () => {
            timeOut--;

            // INITIAL RENDER
            if (localTransactions.length == 0) 
            { 
                listTransactionsByCompany(this.props.companyId, this.state.gt)
                .then(res => {
                    this.transactionsToChartData(localTransactions, res.data.getCompany.transactions.items, this.state.gt);
                })
                .catch(err => {
                    console.log(err);
                    return {err: err, res: null};
                });
            } else 
            {
                // REFRESH
                listTransactionsByCompany(this.props.companyId, null, localTransactions[localTransactions.length-1].createdAt)
                .then(res => {
                    if (res.data.getCompany.transactions.items.length > 0) {
                        this.transactionsToChartData(localTransactions, res.data.getCompany.transactions.items, this.state.gt);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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
        return(
            <View style={ styles.container }>
                <YAxis
                style={{ height: 200 }}
                data={this.state.chartData}
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
                data={this.state.chartData}
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

export default LineChartComponent;