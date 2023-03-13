import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteSpotById, getCurrSpots } from "../../store/spots";
import SpotCard from "../SpotCard/SpotCard";
import './ManageSpots.css'

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
            <div id="list">
                {spotsArr && spotsArr.map(spot => {
                    return <div id="spotLink">
                        <NavLink key={spot.id} to={`/spots/${spot.id}`} className='link' id="spot-link">
                            <SpotCard key={spot.id} spot={spot} />
                        </NavLink>
                        <button onClick={onDelete} id={spot.id} className='delete-button'>Delete</button>
                        <NavLink to={`/spots/${spot.id}/edit`} className='link update-link'>
                            <button className="update-button">Update</button>
                        </NavLink>
                    </div>
                })}
            </div>
        </div>
    );
}

export default ManageSpots;
