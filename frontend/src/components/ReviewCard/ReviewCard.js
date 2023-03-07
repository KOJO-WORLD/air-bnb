import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReviewById, getReviews } from "../../store/reviews";

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const ownerId = review && review.Owner.id
    let authorized;

    if (sessionUser) {
        if (ownerId === sessionUser.id) {
            authorized = true
        } else {
            authorized = false
        }
    } else {
        authorized = false
    }

    const reviewClass = authorized ? "" : " hidden";

    const onDelete = () => {
        dispatch(deleteReviewById(review.id));

        history.push(`/spots/${review.spotId}`);
    }

    // useEffect(() => {
    //     dispatch(getReviews())
    // }, [dispatch, getReviews])

    return (
        <div>
            <div>
                <h5>{review.Owner.firstName}</h5>
                {/* month and year */}
                <p>{review.review}</p>
            </div>
            <div className={reviewClass}>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ReviewCard;
