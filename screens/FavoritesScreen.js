import { useSelector } from "react-redux";
import { FlatList, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from "../components/LoadingComponents";
import { baseUrl } from "../shared/baseUrl";

const FavoritesScreen = ({ navigation }) => {
    const { campsitesArray, isLoading, errMess } = useSelector(
        (state) => state.campsites
    );
    const favorites = useSelector((state) => state.favorites);

    const renderFavoriteItem = ({ item: campsite }) => {
        return (
            <ListItem
                onPress={() =>
                    navigation.navigate("Directory", {
                        screen: "CampsiteInfo",
                        params: { campsite }
                    })
                }
            >
                <Avatar rounded source={{ uri: baseUrl + campsite.image }} />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={campsitesArray.filter(
                (campsite) => favorites.includes(campsite.id)
            )}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

export default FavoritesScreen;