import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
import '../CSS/Login.css'


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4700/users.login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const loggedInUser = data.user;

                updateUser(loggedInUser);
                navigate('/');
            } else {
                alert('Login Failed');
            }
        } catch (error) {
            alert('Login failed' + error);
        }
    };

    return (
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Login</button>
                <p>New Here? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    )
}
