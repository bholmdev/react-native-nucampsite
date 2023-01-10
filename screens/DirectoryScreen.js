import { FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const DirectoryScreen = (props) => {
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <ListItem onPress={() => props.onPress(campsite.id)}>
                <Avatar source={campsite.image} rounded />
                <ListItem.Content>
                    <ListItem.Title>{campsite.name}</ListItem.Title>
                    <ListItem.Subtitle>
                        {campsite.description}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    };

    return (
        <FlatList
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;