import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import styles from "../screens/styles";
import { Loading } from "../components/common";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import deviceStorage from "../services/deviceStorage";
import { GlobalContext } from "../GlobalContext";
import jwtDecode from "jwt-decode";
import { showMessage, hideMessage } from "react-native-flash-message";
const { BASE_URL } = require("../constants");

const Registration = (props) => {
  const { state, setState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkValidations = () => {
    if (!validateEmail(email)) {
      showMessage({
        message: "Not a valid email",
        type: "danger",
      });
      return false;
    }
    if (username.length == 0 || username.length > 15) {
      showMessage({
        message: "Username must be between 0 and 15 characters",
        type: "danger",
      });
      return false;
    }
    if (!usernameIsValid(username)) {
      showMessage({
        message:
          "Username must only contain numbers, letter, and the characters - . _",
        type: "danger",
      });
      return false;
    }
    if (password.length < 5) {
      showMessage({
        message: "Password must be longer than 5 characters",
        type: "danger",
      });
      return false;
    }
    return true;
  };
  const usernameIsValid = (username) => {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onRegisterPress = () => {
    setError("");
    setLoading(false);

    if (!checkValidations()) {
      return;
    }

    axios
      .post(`${BASE_URL}/users/sign_up`, {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
      })
      .then((response) => {
        //   console.log(response.data)
        deviceStorage.saveKey("id_token", response.data);
        const decodedToken = jwtDecode(response.data, { header: false });
        const currentUserID = decodedToken.sub;
        setState({
          jwt: response.data,
          loading: false,
          currentUserID: currentUserID,
        });
        setLoading(false);
        setError("");
        showMessage({
          message: "Success",
          description: "Account Created",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        onRegistrationFail();
      });
  };

  const onRegistrationFail = () => {
    // setState({ loading: false });
    // setError("Error creating account");
    setLoading(false);
    showMessage({
      message: "Sign up failed. Username or email might already exist",
      type: "danger",
    });
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <View style={{ alignItems: "center" }}>
              {/* <Image
                style={styles.logoImage}
                source={require("../assets/vsbro_logo.png")}
              /> */}
              <Text style={{ fontSize: 30, marginTop: 50 }}>Shmood</Text>
              <Text style={{ fontSize: 19, marginTop: 10, marginBottom: 30 }}>
                for moments and mindfulness
              </Text>
            </View>
            <TextInput
              placeholder="joe@gmail.com"
              label="Email"
              autoCapitalize="none"
              autoCorrect="false"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Username"
              label="Username"
              autoCorrect="false"
              autoCapitalize="none"
              value={username}
              onChangeText={(username) => setUsername(username)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              label="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />

            <Text style={styles.errorTextStyle}>{error}</Text>

            {!loading ? (
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => onRegisterPress()}
                title="Sign up 😊"
              />
            ) : (
              <Loading size={"large"} />
            )}
            <Button
              style={{ marginTop: 10, color: "red" }}
            //   buttonStyle={{backgroundColor: "#EEE8AA"}}
              onPress={props.authSwitch}
              color="red"
              title="Have an account? Sign in"
              //   color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Registration;
