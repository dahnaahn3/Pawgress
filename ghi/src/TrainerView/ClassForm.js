import React, { useState } from 'react';

function ClassForm () {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [attendees, setAttendees] = useState('0');
    const [maxAttendees, setMAttendees] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');

    const nameChange = (event) => {
        const valueName = event.target.value;
        setName(valueName);
    }

    const categoryChange = (event) => {
        const valueCategory = event.target.value;
        setCategory(valueCategory);
    }

    const maxAttendeeChange = (event) => {
        const valueMAttendee = event.target.value;
        setMAttendees(valueMAttendee);
    }

    const startChange = (event) => {
        const valueStart = event.target.value;
        setStart(valueStart);
    }

    const endChange = (event) => {
        const valueEnd = event.target.value;
        setEnd(valueEnd);
    }

    const descChange = (event) => {
        const valueDescription = event.target.value;
        setDescription(valueDescription);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data ={};
        data.name = name;
        data.category = category;
        data.attendees = attendees;
        data.max_attendees = maxAttendees;
        data.start_datetime = start;
        data.end_datetime = end;
        data.description = description;
        console.log(start)
        const classUrl = 'http://localhost:8000/api/classes'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(classUrl, fetchConfig)
        if (response.ok) {
            await response.json();

            setName('');
            setCategory('');
            setAttendees('');
            setMAttendees('');
            setStart('');
            setEnd('');
            setDescription('');

        }
    }
    return (
        <div className="form-container">
            <div className="secondary-container">
                <form onSubmit={handleSubmit} id="create-user-form">
                <div className="mb-5">
                    <label htmlFor="name" className="label-css">Class Name</label>
                    <input required onChange={nameChange} type="text" name="name" id="name" placeholder="Class Name" className="form-input-container" value={name}/>
                </div>
                <div className="form-wrap">
                    <div className="label-container">
                    <div className="mb-5">
                        <label htmlFor="category" className="label-css">Category</label>
                        <input required onChange={categoryChange} type="text" name="category" id="category" placeholder="...  ...  ..." className="form-input-container" value={category}/>
                    </div>
                    </div>
                    <div className="label-container">
                    <div className="mb-5">
                        <label htmlFor="max_attendees" className="label-css">Max Attendees</label>
                        <input required onChange={maxAttendeeChange} type="number" name="max_attendees" id="max_attendees" placeholder="Max Attendees" className="form-input-container" value={maxAttendees}/>
                    </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="start_datetime" className="label-css">Start Date/Time</label>
                    <input required onChange={startChange} type="datetime-local" name="start_datetime" id="start_datetime" placeholder="datetiem" className="form-input-container" value={start}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="end_datetime" className="label-css">End Date/Time</label>
                    <input required onChange={endChange} type="datetime-local" name="end_datetime" id="end_datetime" placeholder="datetime" className="form-input-container" value={end}/>
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="label-css">Description</label>
                    <input required onChange={descChange} type="text" name="description" id="description" placeholder="Treats are Great" className="form-input-container" value={description}/>
                </div>
                <div>
                    <button className="submit-button">Submit</button>
                </div>
                </form>
            </div>
        </div>
    );

}

export default ClassForm;
