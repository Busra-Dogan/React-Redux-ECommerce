import React, { useState, useEffect } from "react";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { getAuth, getIdTokenResult, signInWithEmailLink, updatePassword } from "firebase/auth";


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return;
        }

        try {
            let resultSignIn;
            const auth = getAuth();
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    resultSignIn = result;

                    if (result.user.emailVerified) {
                        //remove user email from local storage
                        window.localStorage.removeItem('emailForRegistration');
                        //get user id token
                        let user = auth.currentUser;
                        updatePassword(user, password)
                            .then((result) => {
                                console.log('Result change password ' + result);
                                const idTokenResult = getIdTokenResult(user);
                                //redux store
                                console.log('user', user, 'idTokenResult', idTokenResult);

                                //redirect
                                history.push('/');
                            }).catch((error) => {
                                console.log(error);
                                toast.error(error.message);
                            });

                    }


                }).catch((error) => {
                    console.log(error);
                    toast.error(error.message);
                });
        } catch (error) { }
    }

    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input type={"email"}
            className="form-control"
            value={email}
            disabled
        ></input>
        <input type={"password"}
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
        ></input>
        <br />
        <button type="submit" className="btn btn-raised">Complete Registration</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};
export default RegisterComplete;