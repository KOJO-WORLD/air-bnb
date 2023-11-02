import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReviewById, getReviews } from "../../store/reviews";
import "./ReviewCard.css"

const ReviewCard = ({ review }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const MONTHS = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    const sessionUser = useSelector(state => state.session.user);
    const ownerId = review && review.Owner?.id
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
        dispatch(getReviews(review.spotId));

        history.push(`/spots/${review.spotId}`);
    }

    // useEffect(() => {
    //     dispatch(getReviews())
    // }, [dispatch, getReviews])

    const date = review.createdAt.split('-').slice(0, 2);

    const month = MONTHS[date[1]];

    const year = date[0]

    console.log(month, year);

    return (
        <div>
            <div>
                <h3>{review.Owner?.firstName}</h3>
                <div>
                    <h4>{month} {year}</h4>
                    <p>{review.review}</p>
                </div>
            </div>
            <div className={reviewClass}>
                <button className="review-delete-button" onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ReviewCard;
