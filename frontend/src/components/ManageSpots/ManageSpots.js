import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteSpotById, getCurrSpots } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";

const ManageSpots = () => {
    const spots = useSelector(state => state.spots.currSpots);
    const dispatch = useDispatch();
    const history = useHistory();

    // console.log('checker', spots);
    useEffect(() => {
        dispatch(getCurrSpots());
    }, [dispatch])

    const spotsArr = spots && Object.values(spots)

    const spotClass = spotsArr && spotsArr.length === 0 ? '' : 'hidden';

    const onDelete = (e) => {
        dispatch(deleteSpotById(e.target.id))

        // console.log('deleted');

        // history.push('/');
    }

    return (
        <div>
            <h2>Manage Spots</h2>
            <NavLink to="/createSpot" className={spotClass}>Create a New Spot</NavLink>
            <ul className="curr-spots">
                {spotsArr && spotsArr.map(spot => {
                    return <div>
                        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                            <SpotCard key={spot.id} spot={spot} />
                        </NavLink>
                        <button onClick={onDelete} id={spot.id}>Delete</button>
                        <NavLink to={`/spots/${spot.id}/edit`}>
                            <button>Update</button>
                        </NavLink>
                    </div>
                })}
            </ul>
        </div>
    );
}

export default ManageSpots;
