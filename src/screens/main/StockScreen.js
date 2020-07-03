import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { connect } from 'react-redux';
import { getCompany } from '../../actions/stocks';

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

import { LineChart } from "react-native-chart-kit";

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 0) => `rgba(50,205,50,1)`,
        strokeWidth: 2 // optional
      }
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
    barPercentage: 0,
    useShadowColorFromDataset: false,
  };

class StockScreen extends Component {

  componentDidMount() {
    this.props.getCompany("tsla");
  }

    render() {
        return(
            <View style={ styles.container }>
                <LineChart
                withShadow={false}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                data={data}
                width={screenWidth}
                height={400}
                chartConfig={chartConfig}
                bezier
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 25,
    },
});

const mapStateToProps = state => {
    return {
    rand : 'sasd'
    };
};

export default connect(mapStateToProps, { getCompany })(StockScreen);