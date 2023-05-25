import React, { useState } from 'react';

function SignupForm () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('customer');
    const [password, setPassword] = useState('');

    const firstNChange = (event) => {
        const valueFirst = event.target.value;
        setFirstName(valueFirst);
    }

    const lastNChange = (event) => {
        const valueLast = event.target.value;
        setLastName(valueLast);
    }

    const addressChange = (event) => {
        const valueAddress = event.target.value;
        setAddress(valueAddress);
    }

    const emailChange = (event) => {
        const valueEmail = event.target.value;
        setEmail(valueEmail);
    }

    const phoneChange = (event) => {
        const valuePhone = event.target.value;
        setPhone(valuePhone);
    }

    const passwordChange = (event) => {
        const valuePassword = event.target.value;
        setPassword(valuePassword);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.email = email;
        data.phone_number = phone;
        data.role = role;
        data.password = password;

        const userUrl = 'http://localhost:8000/api/accounts';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(userUrl, fetchConfig)
        if (response.ok) {
            await response.json();

            setFirstName('');
            setLastName('');
            setAddress('');
            setEmail('');
            setPhone('');
            setRole('');
            setPassword('');
        }
    }

    return (
        <div className="form-container">
            <div className="secondary-container">
                <form onSubmit={handleSubmit} id="create-user-form">
                <div className="form-wrap">
                    <div className="label-container">
                    <div className="mb-5">
                        <label htmlFor="first_name" className="label-css">First Name</label>
                        <input required onChange={firstNChange} type="text" name="first_name" id="first_name" placeholder="First Name" className="form-input-container" value={firstName}/>
                    </div>
                    </div>
                    <div className="label-container">
                    <div className="mb-5">
                        <label htmlFor="last_name" className="label-css">Last Name</label>
                        <input required onChange={lastNChange} type="text" name="last_name" id="last_name" placeholder="Last Name" className="form-input-container" value={lastName}/>
                    </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="address" className="label-css">Address</label>
                    <input required onChange={addressChange} type="text" name="address" id="address" placeholder="123 Example Street" className="form-input-container" value={address}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="label-css">Email</label>
                    <input required onChange={emailChange} type="text" name="email" id="email" placeholder="Kibble@pawgress.com" className="form-input-container" value={email}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="phone_number" className="label-css">Phone Number</label>
                    <input required onChange={phoneChange} type="text" name="phone_number" id="phone_number" placeholder="xxx-xxx-xxxx" className="form-input-container" value={phone}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="label-css">Password</label>
                    <input required onChange={passwordChange} type="text" name="password" id="password" placeholder="***********" className="form-input-container" value={password}/>
                </div>
                <div>
                    <button className="submit-button">Submit</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
