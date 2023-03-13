import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignUpFormPage";
import SpotForm from "./components/SpotForm/SpotForm";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import SpotList from "./components/SpotsList/SpotList";
import * as sessionActions from "./store/session";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import ReviewForm from "./components/ReviewForm/ReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Airbnb';
  }, []);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotList />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/spots/current">
            <ManageSpots />
          </Route>
          <Route path="/createSpot">
            <SpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route path="/write-review">
            <ReviewForm />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App;
