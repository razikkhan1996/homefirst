import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const Login = ({ history }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const alert = useAlert();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/todo')
        }
    },[])

    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push('/todo')
            })
            .catch(e => alert.show(e.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center" >
        <div className="w-xl-75 bg-white shadow-lg">
            <div className="m-5">
                <label className="d-block text-xl font-bold mb-2">Email</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    className="border-grey-200 border-2 rounded w-100 p-2 h-10"
                />
            </div>
            <div className="m-5">
                <label className="d-block text-xl font-bold mb-2">Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    className="border-grey-200 border-2 rounded w-100 p-2 h-25"
                />
            </div>
            <div className="m-5">
                <button
                    onClick={onLogin}
                    className="w-50 text-white px-3 py-2 rounded text-xl font-bold"
                    style={{"background-color":  "#821D30"}}
                >
                    {loading ? 'Logging you in ...' : 'Login'}
                </button>
            </div>
            <div className="m-5">
                <Link to="/signup" style={{"color":  "#821D30"}}>
                    Don't have an account?
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Login;
