import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./SpotForm.css";

const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [prevImage, setPrevImage] = useState('');
    const [images, setImages] = useState([]);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePrevImage = (e) => setPrevImage(e.target.value);
    const updateImages = (e) => setImages([...images, e.target.value]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        const imgPayload = {
            prevImage,
            images
        }

        if (!payload.lat) payload.lat = 0;
        if (!payload.lng) payload.lng = 0;

        const createdSpot = await dispatch(createNewSpot(payload, imgPayload))
        console.log('created spot', createdSpot);

        // const spotChecker = useGetSpotId();

        if (createdSpot && createdSpot) {
            history.push(`/spots/${createdSpot.id}`);
        }
    }

    return (
        <div className="page-div">
            <div id="form-div">
                <h1 className="create-spot-form-header">Create a new spot</h1>
                <form onSubmit={handleSubmit} className="create-spot-form">
                    <section id="location">
                        <h2 className="create-form-headers">Where's your place located?</h2>
                        <h3>Guests will only get your exact address once they booked a reservation.</h3>

                        <div id="address-div">
                            <label for="Address">Address: </label>
                            <input
                                name="Address"
                                id="Address"
                                type="text"
                                placeholder="Address"
                                required
                                // value={String}
                                onChange={updateAddress}
                            ></input>
                        </div>
                        <div id="city-state">
                            <div id="city-div" className="multi-input">
                                <label for="City">City: </label>
                                <input
                                    name="City"
                                    id="City"
                                    type="text"
                                    placeholder="City"
                                    required
                                    // value={String}
                                    onChange={updateCity}
                                ></input>
                            </div>
                            <div id="state-div" className="multi-input">
                                <label for="State">State: </label>
                                <input
                                    name="State"
                                    id="State"
                                    type="text"
                                    placeholder="State"
                                    maxLength={2}
                                    required
                                    // value={String}
                                    onChange={updateState}
                                ></input>
                            </div>
                        </div>
                        <div id="country-div">
                            <label for="Country">Country: </label>
                            <input
                                name="Country"
                                id="Country"
                                type="text"
                                placeholder="Country"
                                required
                                // value={String}
                                onChange={updateCountry}
                            ></input>
                        </div>
                        <div id="lng-lat">
                            <div id="lat-div" className="multi-input">
                                <label for="Lat">Latitude: </label>
                                <input
                                    name="Lat"
                                    id="Lat"
                                    type="number"
                                    placeholder="Latitude (optional)"
                                    // required
                                    // value={Number}
                                    onChange={updateLat}
                                ></input>
                            </div>
                            <div id="lng-div" className="multi-input">
                                <label for="Lng">Longitutde: </label>
                                <input
                                    name="Lng"
                                    id="Lng"
                                    type="number"
                                    placeholder="Longitutde (optional)"
                                    // required
                                    // value={Number}
                                    onChange={updateLng}
                                ></input>
                            </div>
                        </div>
                        <hr class="solid"></hr>
                    </section>
                    <section id="description">
                        <h2 className="create-form-headers">Describe your place to guests</h2>
                        <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>
                        {/* <label for="description">Description: </label> */}
                        <input
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Please write at least 30 characters"
                            required
                            // value={String}
                            onChange={updateDescription}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <section id="title">
                        <h2 className="create-form-headers">Create a title for your spot</h2>
                        <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>
                        {/* <label for="name">Name: </label> */}
                        <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name of your spot"
                            required
                            // value={String}
                            onChange={updateName}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <section id="pics">
                        <div>
                            <h2 className="create-form-headers">Liven up your spot with photos</h2>
                            <h3>Submit a link to at least one photo to publish your spot.</h3>
                        </div>
                        <input
                            name="preview-image"
                            id="preview-image"
                            type="text"
                            placeholder="Preview Image URL"
                            required
                            // value={Number}
                            onChange={updatePrevImage}
                        ></input>
                        <input
                            name="image1"
                            id="image1"
                            type="text"
                            placeholder="Image URL"
                            // required
                            // value={Number}
                            onChange={updateImages}
                        ></input>
                        <input
                            name="image2"
                            id="image2"
                            type="text"
                            placeholder="Image URL"
                            // required
                            // value={Number}
                            onChange={updateImages}
                        ></input>
                        <input
                            name="image3"
                            id="image3"
                            type="text"
                            placeholder="Image URL"
                            // required
                            // value={Number}
                            onChange={updateImages}
                        ></input>
                        <input
                            name="image4"
                            id="image4"
                            type="text"
                            placeholder="Image URL"
                            // required
                            // value={Number}
                            onChange={updateImages}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <section id="pricing">
                        <h2 className="create-form-headers">Set a base price for your spot</h2>
                        <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                        <label for="price">Price: </label>
                        <input
                            name="price"
                            id="price"
                            type="number"
                            step="0.01"
                            min={0}
                            max={999999999}
                            placeholder="Price per night (USD)"
                            required
                            // value={any}
                            onChange={updatePrice}
                        ></input>
                        <hr class="solid"></hr>
                    </section>
                    <div id="submit-button">
                        <button id="submit" type="submit" className="create-submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SpotForm
