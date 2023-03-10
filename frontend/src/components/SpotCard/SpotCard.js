// import { NavLink } from "react-router-dom";
// import './SpotCard.css'

const SpotCard = ({ spot: { name, avgRating, price, previewImage } }) => {
    // console.log(name);
    // console.log(name, avgRating, isNaN(avgRating));

    const rating = !isNaN(avgRating) ? avgRating : 'NEW';

    return (
        <li className="spot-details">
            <div className="spot">
                <img id="spot-prev" src={previewImage} alt='axolotl pic'></img>
                <div id='info'>
                    <span id="spot-name tooltiptext">{name}</span>
                    <span id="spot-rating">{rating}</span>
                    <span id="spot-price">${price}/Night</span>
                </div>
            </div>
        </li>
    )
}

export default SpotCard
