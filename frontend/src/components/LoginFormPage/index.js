import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const demoClick = (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {
            credential: 'DemoUser',
            password: 'DemoPassword'
        }
        return dispatch(sessionActions.login(user))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div id='form'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div id='login-input'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        Username or Email
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" id='login-button'>Log In</button>
                <button onClick={demoClick}>Demo User</button>
            </form>
        </div>
    );
}


export default LoginFormPage;
