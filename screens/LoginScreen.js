import { useEffect, useState } from "react";
import { Image, StyleSheet, ScrollView, View } from "react-native";
import { Button, CheckBox, Icon, Input } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../shared/baseUrl";
import logo from "../assets/images/logo.png";
import * as ImageManipulator from "expo-image-manipulator";
import { SaveFormat } from "expo-image-manipulator";

const LoginTab = ({ navigation }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log("username: ", username);
        console.log("password: ", password);
        console.log("remember: ", remember);
        if (remember) {
            SecureStore.setItemAsync(
                "userinfo",
                JSON.stringify({
                    username,
                    password
                })
            ).catch(error => console.log("Could not save user info", error));
        } else {
            SecureStore.deleteItemAsync("userinfo").catch(
                error => console.log("Could not delete user info", error)
            )
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync("userinfo").then(userdata => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUserName(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: "font-awesome", name: "user-o" }}
                onChangeText={(text) => setUserName(text)}
                value={username}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder="Password"
                leftIcon={{ type: "font-awesome", name: "key" }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox
                title="Remember Me"
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title="Login"
                    color="#5637dd"
                    icon={
                        <Icon
                            name="sign-in"
                            type="font-awesome"
                            color="#fff"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    buttonStyle={{ backgroundColor: "#5637dd" }}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => navigation.navigate("Register")}
                    title="Register"
                    type="clear"
                    icon={
                        <Icon
                            name="user-plus"
                            type="font-awesome"
                            color="blue"
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    titleStyle={{ color: "blue" }}
                />
            </View>
        </View>
    );
};

const RegisterTab = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(baseUrl + "images/logo.png");

    const handleRegister = () => {
        const userInfo = {
            username,
            password,
            firstName,
            lastName,
            email,
            remember
        };

        console.log(JSON.stringify(userInfo));

        if (remember) {
            SecureStore.setItemAsync(
                "userinfo",
                JSON.stringify({
                    username,
                    password
                })
            ).catch(error => console.log("Could not save user info", error));
        } else {
            SecureStore.deleteItemAsync("userinfo").catch(
                error => console.log("Could not delete user info", error)
            )
        }
    };

    const getImageFromCamera = async () => {
        const cameraPermission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermission.status === "granted") {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }
    };

    const processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { width: 400 } }],
            { format: SaveFormat.PNG },
        );
        console.log(processedImage)
        setImageUrl(processedImage.uri);
    };

    const getImageFromGallery = async () => {
        const mediaLibraryPermissions =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (mediaLibraryPermissions.status === "granted") {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });

            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                processImage(capturedImage.uri);
            }
        }
    };

    

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.ImageContaner}>
                    <Image
                        source={{ uri: imageUrl }}
                        loadingIndicatorSource={logo}
                        style={styles.image}
                    />
                    <Button
                        title="Camera"
                        onPress={getImageFromCamera}
                    />
                    <Button
                        title="Gallery"
                        onPress={getImageFromGallery}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: "font-awesome", name: "user-o" }}
                    onChangeText={(text) => setUserName(text)}
                    value={username}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: "font-awesome", name: "key" }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: "font-awesome", name: "user-o" }}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: "font-awesome", name: "user-o" }}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: "font-awesome", name: "envelope-o" }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title="Register"
                        type="#5637DD"
                        icon={
                            <Icon
                                name="user-plus"
                                type="font-awesome"
                                color="#fff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: "#5637DD" }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: "#5673dd",
        inactiveBackgroundColor: "#cec8ff",
        activeTintColor: "#fff",
        inactiveTintColor: "#808080",
        labelStyle: { fontSize: 16 }
    };

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Login"
                component={LoginTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name="sign-in"
                                type="font-awesome"
                                color={props.color}
                            />
                        );
                    }
                }}
            />
            <Tab.Screen
                name="Register"
                component={RegisterTab}
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                name="user-plus"
                                type="font-awesome"
                                color={props.color}
                            />
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        jusifyContent: "center",
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    ImageContaner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default LoginScreen;