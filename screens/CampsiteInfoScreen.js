import RenderCampsite from "../features/campsites/RenderCampsite";

const CampsiteInfoScreen = (props) => {
    return <RenderCampsite campsite={props.campsite} />
};

export default CampsiteInfoScreen;