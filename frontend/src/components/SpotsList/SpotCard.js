// import { NavLink } from "react-router-dom";

const SpotCard = ({ spot : {name, avgRating, price, previewImage} }) => {
    // console.log(name);

    const rating = avgRating ? avgRating : 'NEW';

    return (
        <li className="spot-details">
            {/* <NavLink key={id} to={`/spots/${id}`}> */}
                <div className="spot">
                    <img src={previewImage} alt='axolotl pic'></img>
                    <span>{name}</span>
                    <span>{rating}</span>
                    <span>${price}/Night</span>
                </div>
            {/* </NavLink> */}
        </li>
    )
}

export default SpotCard
