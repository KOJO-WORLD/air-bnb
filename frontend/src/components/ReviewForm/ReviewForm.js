import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewReview } from "../../store/reviews";

const ReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spots.spot)

    const [review, setReview] = useState('');
    const [submitClass, setSubmitClass] = useState('hidden');
    const [stars, setStars] = useState();

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    useEffect(() => {
        if(review.length >= 10)setSubmitClass('');
        else setSubmitClass('hidden');
    }, [review])

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            stars
        };

        console.log(payload);

        const rev = dispatch(createNewReview(spot.id, payload));

        console.log('review', rev);

        history.push(`/spots/${spot.id}`);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>How was your Stay?</h2>
                <label
                for="stars"
                >Stars:</label>
                <input name="stars" type='number' onChange={updateStars} max={5} min={1}></input>
                <textarea
                placeholder='Leave your review here...'
                onChange={updateReview}
                ></textarea>
                <button className={submitClass}>Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewForm;
