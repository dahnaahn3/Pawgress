import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import useToken from "@galvanize-inc/jwtdown-for-react";
// import useUser from "./useUser";

function CustomerProfile() {
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);

  // put this in the NAV
  // const { token, logout } = useToken();
  // const { user } = useUser(token);

  const { user_id } = useParams();
  const fetchData = async () => {
    const userURL = `http://localhost:8000/api/accounts/${user_id}/`;
    const petsURL = "http://localhost:8000/api/pets";

    const [userResponse, petsResponse] = await Promise.all([
      fetch(userURL),
      fetch(petsURL),
    ]);

    if (userResponse.ok && petsResponse.ok) {
      const userData = await userResponse.json();
      const petsData = await petsResponse.json();
      console.log(userData, petsData);

      const filteredPets = petsData.filter(
        (pet) => pet.owner_id === parseInt(user_id)
      );
      setUser(userData);
      setPets(filteredPets);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-xl p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src="https://picsum.photos/200"
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-center text-gray-600 mt-1">Proud pet owner!</p>
        <div className="mt-5">
          <h3 className="text-xl font-semibold ml-3">Details</h3>
          <div className="max-w-[700px] mx-auto mt-3">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-md text-gray-600">Address</p>
              <p className="text-base font-medium text-navy-700">
                {user.address}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Email</p>
              <p className="text-base font-medium text-navy-700">
                {user.email}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mt-3">
              <p className="text-md text-gray-600">Phone Number</p>
              <p className="text-base font-medium text-navy-700">
                {user.phone_number}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mt-3">
              <h3 className="text-lg font-semibold">Pets</h3>
              {pets.map((pet) => (
                <div className="w-full mx-auto my-10 bg-white rounded-lg shadow-xl p-5">
                  <a
                    href={`/customers/${user_id}/${pet.pet_id}`}
                    className="flex items-center mt-2"
                  >
                    <img
                      className="w-20 h-20 rounded-full mr-2"
                      src={pet.picture}
                      alt="Pet"
                    />
                    <p className="text-center text-2xl font-semibold mt-3">
                      {pet.name}
                    </p>
                  </a>
                  <div className="mt-5">
                    <div className="max-w-[700px] mx-auto mt-3">
                      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none">
                        <p className="text-md text-gray-600">Breed</p>
                        <p className="text-base font-medium text-navy-700">
                          {pet.breed}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
                        <p className="text-md text-gray-600">Gender</p>
                        <p className="text-base font-medium text-navy-700">
                          {pet.gender}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
                        <p className="text-md text-gray-600">Age</p>
                        <p className="text-base font-medium text-navy-700">
                          {pet.age}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
                        <p className="text-md text-gray-600">Size</p>
                        <p className="text-base font-medium text-navy-700">
                          {pet.size}
                        </p>
                      </div>

                      <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700 dark:shadow-none mt-3">
                        <p className="text-md text-gray-600">Weight</p>
                        <p className="text-base font-medium text-navy-700">
                          {pet.weight}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/customers/${user_id}/${pet.pet_id}/edit`}
                    className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <BiEditAlt />
                    <span>Edit</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
