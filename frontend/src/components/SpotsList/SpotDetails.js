import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";

const SpotDetails = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams()

    console.log(spotId);

    useEffect(() => {
        dispatch(getSpotById(spotId));
    })

    return (
        <h2>
            Spot
        </h2>

    )
}

export default SpotDetails;
