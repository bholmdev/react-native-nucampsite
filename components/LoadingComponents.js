import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#5637dd" />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    loadingView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    loadingText: {
        color: "#5637dd",
        fontSize: 14,
        fontWeight: "bold"
    }
});

export default Loading;