import React, { useEffect, useContext, useState, Component } from "react";
import axios from "axios";
import styles from "../screens/styles";
import { Loading } from "../components/common";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import jwtDecode from "jwt-decode";
import { Button } from "react-native-elements";
import deviceStorage from "../services/deviceStorage";
import { GlobalContext } from "../GlobalContext";
import { showMessage, hideMessage } from "react-native-flash-message";
const { BASE_URL } = require("../constants");

const Login = (props) => {
  const { state, setState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLoginPress = () => {
    setError("");
    setLoading(true);
    axios
      .post(`${BASE_URL}/users/sign_in`, {
        email: email.toLowerCase(),
        password,
      })
      .then((response) => {
        deviceStorage.saveKey("id_token", response.data);
        const decodedToken = jwtDecode(response.data, { header: false });
        const currentUserID = decodedToken.sub;
        setState({
          jwt: response.data,
          loading: false,
          currentUserID: currentUserID,
        });
        // setState({jwt: response.data, loading: false})
      })
      .catch((error) => {
        console.log(error);
        onLoginFail();
      });
  };

  const onLoginFail = () => {
    setLoading(false);
    showMessage({
      message: "Incorrect Login",
      type: "danger",
    });
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={{ fontSize: 30, marginTop: 50, textAlign: "center" }}>
              Shmood
            </Text>
            <Text style={{ fontSize: 19, marginTop: 10, marginBottom: 30 }}>
              for moments and mindfulness
            </Text>
            {/* <Text style={styles.logoText}>VSBRO</Text> */}
            {/* <View style={{alignItems: "center"}}><Image style={styles.logoImage} source={require("../assets/vsbro_logo.png")}/></View> */}
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={(email) => setEmail(email)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />

            <Text style={styles.errorTextStyle}>{error}</Text>

            {!loading ? (
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => onLoginPress()}
                title="Login"
              />
            ) : (
              <Loading size={"large"} />
            )}
            <Button
              //   buttonStyle={styles.fbLoginButton}
              style={{ marginTop: 10 }}
              onPress={props.authSwitch}
              title="Need an account? Sign up"
              color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
