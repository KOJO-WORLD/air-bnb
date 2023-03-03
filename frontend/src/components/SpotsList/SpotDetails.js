import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";

// ERROR: On Refresh all of the data gets swept away
const SpotDetails = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams()

    useEffect(() => {
        console.log('useeffect used');
        dispatch(getSpotById(spotId));
    }, [dispatch, spotId])

    // console.log(spotId);

    const spot = useSelector(state => state.spots.spot);

    // const spotImgArr = spot.spotImages

    console.log('here', spot.owner);

    const onClick = () => {
        // open an alert with the text "Feature coming soon".
    }

    return (
        <div className="spotInfo">
            <h1>
                {spot.name}
            </h1>
            <h3>
                Location: {spot.city}, {spot.state}, {spot.country}
            </h3>
            <div className="spotImages">
                {/* {spotImgArr.map((spotImg) => {
                    return <div>
                        <img src={spotImg.url} alt='spot pic'></img>
                    </div>
                })} */}
            </div>
            <div className="callout">
                <p>${spot.price}/Night</p>
                <button onClick={onClick}>Reserve</button>
            </div>
            <h4>Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}</h4>
            <div className="description">
                <p>
                    {spot.description}
                </p>
            </div>
        </div>

    )
}

export default SpotDetails;
