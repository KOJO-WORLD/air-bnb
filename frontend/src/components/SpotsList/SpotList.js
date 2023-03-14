import SpotCard from '../SpotCard/SpotCard'
import { useSelector, useDispatch } from "react-redux";
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './SpotList.css'

function SpotList() {
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('used please');
        dispatch(getSpots());
        // console.log('please');
    }, [dispatch])

    const spots = useSelector(state => state.spots);

    if(spots.spot) delete spots.spot

    // console.log('checker', spots);

    const spotsArr = spots && Object.values(spots)

    // console.log(spotsArr);

    return (
        <>
            <h1>All Spots</h1>
            <div id="list">
                {spotsArr.map(spot => {
                    return <NavLink key={spot.id} to={`/spots/${spot.id}`} className="link spot-link" id="spotLink">
                        <SpotCard key={spot.id} spot={spot} />
                    </NavLink>
                })}
            </div>
        </>
    )
}

export default SpotList
