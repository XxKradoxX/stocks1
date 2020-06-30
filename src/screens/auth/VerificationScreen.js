import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { verifyAccount } from '../../actions/';

import { connect } from 'react-redux';

import { Formik } from 'formik';
import { AUTH_SIGNUP_OK } from "../../actions/types";

class VerificationScreen extends Component {

    componentDidUpdate() {
        console.log("STATUS")
        console.log(this.props.email);
    }

    render() {
        return(
            <View style={ styles.container }>
                <Formik
                initialValues={{ code: '' }}
                onSubmit={ values => this.props.verifyAccount(this.props.email, values.code) } >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <View>
                            <Text>Verification Code</Text>
                                <TextInput
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                value={values.code} />
                            </View>
                            <Button onPress={ () => handleSubmit() } title="Submit" />
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 25,
    },
});

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        status: state.auth.status,
        err: state.auth.err,
    }
}   

export default connect(mapStateToProps, { verifyAccount })(VerificationScreen);