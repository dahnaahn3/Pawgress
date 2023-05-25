import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function EditPet() {
  const [pet, setPet] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Breed: "",
    Gender: "",
    Age: "",
    Picture: "",
    Size: "",
    Weight: "",
    Diet: "",
  });

  // put this in the NAV
  // const { token, logout } = useToken();
  // const { user } = useUser(token);

  const { user_id, pet_id } = useParams();
  const fetchData = async () => {
    const petURL = `http://localhost:8000/api/pets/${pet_id}/`;

    const petResponse = await fetch(petURL);

    if (petResponse.ok) {
      const petData = await petResponse.json();
      setPet(petData);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Determine the fields that have changed
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== pet[key]) {
        updatedFields[key] = formData[key];
      }
    }

    // If no fields have changed
    if (Object.keys(updatedFields).length === 0) {
      alert("No changes have been made.");
      return;
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <p> This is the edit page </p>
    // <div className="form-container">
    //   <div className="secondary-container">
    //     <form onSubmit={handleSubmit} id="create-user-form">
    //       <div className="mb-5">
    //         <label htmlFor="name" className="label-css">
    //           Class Name
    //         </label>
    //         <input
    //           required
    //           onChange={nameChange}
    //           type="text"
    //           name="name"
    //           id="name"
    //           placeholder="Class Name"
    //           className="form-input-container"
    //           value={name}
    //         />
    //       </div>
    //       <div className="form-wrap">
    //         <div className="label-container">
    //           <div className="mb-5">
    //             <label htmlFor="category" className="label-css">
    //               Category
    //             </label>
    //             <input
    //               required
    //               onChange={categoryChange}
    //               type="text"
    //               name="category"
    //               id="category"
    //               placeholder="...  ...  ..."
    //               className="form-input-container"
    //               value={category}
    //             />
    //           </div>
    //         </div>
    //         <div className="label-container">
    //           <div className="mb-5">
    //             <label htmlFor="max_attendees" className="label-css">
    //               Max Attendees
    //             </label>
    //             <input
    //               required
    //               onChange={maxAttendeeChange}
    //               type="number"
    //               name="max_attendees"
    //               id="max_attendees"
    //               placeholder="Max Attendees"
    //               className="form-input-container"
    //               value={maxAttendees}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mb-5">
    //         <label htmlFor="start_datetime" className="label-css">
    //           Start Date/Time
    //         </label>
    //         <input
    //           required
    //           onChange={startChange}
    //           type="datetime-local"
    //           name="start_datetime"
    //           id="start_datetime"
    //           placeholder="datetiem"
    //           className="form-input-container"
    //           value={start}
    //         />
    //       </div>
    //       <div className="mb-5">
    //         <label htmlFor="end_datetime" className="label-css">
    //           End Date/Time
    //         </label>
    //         <input
    //           required
    //           onChange={endChange}
    //           type="datetime-local"
    //           name="end_datetime"
    //           id="end_datetime"
    //           placeholder="datetime"
    //           className="form-input-container"
    //           value={end}
    //         />
    //       </div>
    //       <div className="mb-5">
    //         <label htmlFor="description" className="label-css">
    //           Description
    //         </label>
    //         <input
    //           required
    //           onChange={descChange}
    //           type="text"
    //           name="description"
    //           id="description"
    //           placeholder="Treats are Great"
    //           className="form-input-container"
    //           value={description}
    //         />
    //       </div>
    //       <div>
    //         <button className="submit-button">Submit</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default EditPet;
