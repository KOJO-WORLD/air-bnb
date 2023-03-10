import SpotCard from '../SpotCard/SpotCard'
import { useSelector, useDispatch } from "react-redux";
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function SpotList() {
    const spots = useSelector(state => state.spots);
    const dispatch = useDispatch();

    // console.log('checker', spots);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])

    const spotsArr = Object.values(spots)

    // console.log(spots);

    return (
        <>
            <h1>All Spots</h1>
            <ul className="spot-list">
                {spotsArr.map(spot => {
                    return <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <SpotCard key={spot.id} spot={spot} />
                    </NavLink>
                })}
            </ul>
        </>
    )
}

export default SpotList
