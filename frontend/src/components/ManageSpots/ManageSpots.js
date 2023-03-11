import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteSpotById, getCurrSpots } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";

const ManageSpots = () => {
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrSpots());
    }, [dispatch])

    const spotsArr = spots && Object.values(spots)

    console.log(spotsArr);

    const spotClass = spotsArr && spotsArr.length === 0 ? '' : 'hidden';

    const onDelete = (e) => {
        dispatch(deleteSpotById(e.target.id))

        // console.log('deleted');

        // history.push('/');
    }

    return (
        <div>
            <h1>Manage Spots</h1>
            <NavLink to="/createSpot" className={spotClass + '-link'}>Create a New Spot</NavLink>
            <ul className="curr-spots">
                {spotsArr && spotsArr.map(spot => {
                    return <div>
                        <NavLink key={spot.id} to={`/spots/${spot.id}`} className='link'>
                            <SpotCard key={spot.id} spot={spot} />
                        </NavLink>
                        <button onClick={onDelete} id={spot.id}>Delete</button>
                        <NavLink to={`/spots/${spot.id}/edit`} className='link'>
                            <button>Update</button>
                        </NavLink>
                    </div>
                })}
            </ul>
        </div>
    );
}

export default ManageSpots;
