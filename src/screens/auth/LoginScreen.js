import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';

import { loginWithEmail } from '../../actions/auth';

import { connect } from 'react-redux';

import { Formik } from 'formik';

class SignupScreen extends Component {

    render() {
        return(
            <View style={styles.container} >
                <Formik
                initialValues={{ email: 'kent.jonathan.utomo@gmail.com', password: 'Kutomo234' }}
                onSubmit={ values => {console.log(values);this.props.loginWithEmail(values.email, values.password);} } >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <View>
                        <Text>email</Text>
                            <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email} />
                        </View>
                        <View>
                            <Text>Password</Text>
                            <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password} />
                        </View>
                        <Button onPress={() => handleSubmit()} title="Submit" />
                    </View>
                    )}
                </Formik>
                <View style={{ marginTop: 10 }}>
                    <Text>Don't have an account?</Text>  
                    <Text 
                        style={{ color: "#0000FF" }}
                        onPress={ () => this.props.navigation.navigate("Signup") }> 
                        Signup
                    </Text>  
                </View>
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
        email: state.auth.user,
        status: state.auth.status,
        err: state.auth.err,
    }
}   

export default connect(mapStateToProps, { loginWithEmail })(SignupScreen);