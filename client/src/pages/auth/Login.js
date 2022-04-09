import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state}));
    useEffect(()=>{
        if(user && user.token) history.push('/');
    },[user])

    
    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                const idTokenResult = user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    },
                });
                history.push("/");

            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
                setLoading(false);
            });
    };

    const googleLogin = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const idTokenResult = user.getIdTokenResult();
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    },
                });
                history.push("/");
            }).catch((error) => {

                const email = error.email;
                toast.error(error.message);
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };

    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type={"email"}
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                placeholder="Your email"
            ></input>
        </div>
        <div className="form-group">
            <input type={"password"}
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
            ></input>
        </div>
        <br />
        <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6}
        >
            Login with Email/Password
        </Button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="test-danger">Loading..</h4>

                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
                    </Button>

                    <Link to="/forgot/password" className="float-right text-danger">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Login;