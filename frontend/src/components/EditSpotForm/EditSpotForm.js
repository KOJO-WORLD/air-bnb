import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot } from "../../store/spots";
import { useHistory, useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";

const EditSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { spotId } = useParams()

    useEffect(() => {
        console.log('useEffect used');
        dispatch(getSpotById(spotId));
        // dispatch()
    }, [dispatch, spotId])

    console.log(spotId);

    const spot = useSelector(state => state.spots.spot);

    const spotImgArr = spot && spot.SpotImages

    let prev;

    const imgArr = spotImgArr.filter(img => {
        if (!img.preview) return img.url;
    });

    spotImgArr.forEach(img => {
        if (img.preview) prev = img.url;
    });

    const [address, setAddress] = useState(spot && spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [prevImage, setPrevImage] = useState('');
    const [images, setImages] = useState(imgArr);

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

    const imgInputs = []
    for (let i = 0; i < 4; i++) {

        imgInputs.push(
            <input
                className="image"
                type="text"
                placeholder="Image URL"
                required
                value={imgArr[i]}
                onChange={updateImages}
            ></input>
        )
    }

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

        const editedSpot = dispatch(createNewSpot(payload, imgPayload))
        if (editedSpot) {
            history.push(`/spot/${editedSpot.id}`);
        }
    }

    return (
        <div>
            <h1>Edit spot</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <h3>Where's your place located?</h3>
                    <h4>Guests will only get your exact address once they booked a reservation.</h4>

                    <label for="Address">Address: </label>
                    <input
                        name="Address"
                        id="Address"
                        type="text"
                        placeholder="address"
                        required
                        value={address}
                        onChange={updateAddress}
                    ></input>
                    <label for="City">City: </label>
                    <input
                        name="City"
                        id="City"
                        type="text"
                        placeholder="city"
                        required
                        value={city}
                        onChange={updateCity}
                    ></input>
                    <label for="State">State: </label>
                    <input
                        name="State"
                        id="State"
                        type="text"
                        placeholder="state"
                        maxLength={2}
                        required
                        value={state}
                        onChange={updateState}
                    ></input>
                    <label for="Country">Country: </label>
                    <input
                        name="Country"
                        id="Country"
                        type="text"
                        placeholder="country"
                        required
                        value={country}
                        onChange={updateCountry}
                    ></input>
                    <label for="Lat">Latitude: </label>
                    <input
                        name="Lat"
                        id="Lat"
                        type="number"
                        placeholder="latitude (optional)"
                        required
                        value={lat}
                        onChange={updateLat}
                    ></input>
                    <label for="Lng">Longitutde: </label>
                    <input
                        name="Lng"
                        id="Lng"
                        type="number"
                        placeholder="longitutde (optional)"
                        required
                        value={lng}
                        onChange={updateLng}
                    ></input>
                </section>
                <section>
                    <h3>Describe your place to guests</h3>
                    <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <label for="description">Description: </label>
                    <input
                        name="description"
                        id="description"
                        type="text"
                        placeholder="Please write at least 30 characters"
                        required
                        value={description}
                        onChange={updateDescription}
                    ></input>
                </section>
                <section>
                    <h3>Create a title for your spot</h3>
                    <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                    <label for="name">Name: </label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Name of your spot"
                        required
                        value={name}
                        onChange={updateName}
                    ></input>
                </section>
                <section>
                    <h3>Liven up your spot with photos</h3>
                    <h4>Submit a link to at least one photo to publish your spot.</h4>
                    {/* <label for="image">Price: </label> */}
                    <input
                        name="preview-image"
                        id="preview-image"
                        type="text"
                        placeholder="Preview Image URL"
                        required
                        value={prev}
                        onChange={updatePrevImage}
                    ></input>
                    {
                        imgInputs
                        // imgArr.map(img => {
                        //     <input
                        //         className="image"
                        //         type="text"
                        //         placeholder="Image URL"
                        //         required
                        //         value={img}
                        //         onChange={updateImages}
                        //     ></input>
                        // })
                    }
                </section>
                <section>
                    <h3>Set a base price for your spot</h3>
                    <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
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
                </section>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default EditSpotForm;
