import React, { useState } from "react";
import { app } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => { 
        e.preventDeafult() 
        const config = {
            url:'htpp://localhost:3000/register/complete',
            handleCodeInApp:true
        }

        await app.sendSignInLinkToEmail(email, config)
    }
    const registerForm = () => <form onSubmit={handleSubmit}>
        <input type={"email"}
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
        >
        </input>
        <button type="submit" className="btn btn-raised">Register</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};
export default Register;