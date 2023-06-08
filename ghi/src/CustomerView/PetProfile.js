import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";

function PetProfile() {
  const [pet, setPet] = useState([]);
  const { token } = useToken();
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const { user_id, pet_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const petURL = `${baseUrl}/api/pets/${pet_id}`;

      const petResponse = await fetch(petURL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (petResponse.ok) {
        const petData = await petResponse.json();
        setPet(petData);
      } else {
        console.log("Error fetching data");
      }
    };

    if (token) {
      fetchData();
    }
  }, [baseUrl, pet_id, token]);

  return (
    <div className="w-full cs-main-component">
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-xl p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={pet.picture}
          alt="Profile "
        />
        <div> </div>
        <h2 className="text-center text-2xl font-semibold mt-3">{pet.name}</h2>
        <div className="mt-5">
          <h3 className="text-xl font-semibold ml-3">Details</h3>
          <div className="max-w-[700px] mx-auto mt-3">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none">
              <p className="text-md text-gray-600">Breed</p>
              <p className="text-base font-medium text-navy-700">{pet.breed}</p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Gender</p>
              <p className="text-base font-medium text-navy-700">
                {pet.gender}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Age</p>
              <p className="text-base font-medium text-navy-700">{pet.age}</p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Size</p>
              <p className="text-base font-medium text-navy-700">{pet.size}</p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Weight (lbs.)</p>
              <p className="text-base font-medium text-navy-700">
                {pet.weight}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/customers/${user_id}/${pet.pet_id}/edit`}
          className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <BiEditAlt />
          <span>Edit</span>
        </Link>
      </div>
    </div>
  );
}

export default PetProfile;
