import Main from "./screens/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/LoadingComponents";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
};