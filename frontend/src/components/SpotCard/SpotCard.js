// import { NavLink } from "react-router-dom";
import './SpotCard.css'

const SpotCard = ({ spot: { name, city, state, avgRating, price, previewImage } }) => {
    // console.log(name);
    // console.log(name, avgRating, isNaN(avgRating));

    const rating = !isNaN(avgRating) ? avgRating : 'NEW';

    return (
        // <li className="spot-details">
        <div id="spot" className="tooltip" data-text={name}>
            <img id="spot-prev" src={previewImage} alt='axolotl pic'></img>
            <div id='info'>
                <span id='spot-location'>{city}, {state}</span>
                <span id="spot-rating">
                <i class="fa-solid fa-star"></i> {rating}
                </span>
                <span id="spot-price">${price}/Night</span>
            </div>
        </div>
        // </li>
    )
}

export default SpotCard
