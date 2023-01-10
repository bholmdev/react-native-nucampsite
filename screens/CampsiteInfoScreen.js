import RenderCampsite from "../features/campsites/RenderCampsite";

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;

    return <RenderCampsite campsite={campsite} />
};

export default CampsiteInfoScreen;