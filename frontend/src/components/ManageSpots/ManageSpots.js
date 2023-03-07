import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrSpots } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";

const ManageSpots = () => {
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    // console.log('checker', spots);
    useEffect(() => {
        dispatch(getCurrSpots());
    }, [dispatch])

    const spotsArr = Object.values(spots)

    const spotText = spotsArr.length === 0 ? 'Create a New Spot' : '';

    return (
        <div>
            <h2>Manage Spots</h2>
            <p>{spotText}</p>
            <ul className="curr-spots">
                {spotsArr.map(spot => {
                    return <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <SpotCard key={spot.id} spot={spot} />
                    </NavLink>
                })}
            </ul>
        </div>
    );
}

export default ManageSpots;
