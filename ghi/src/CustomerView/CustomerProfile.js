import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "../useUser";
import {NavLink} from 'react-router-dom'

function CustomerProfile() {
  const [user, setUser] = useState([]);
  const [pets, setPets] = useState([]);

  const { token } = useAuthContext();
  const tokenUser = useUser(token);
  const baseUrl = process.env.REACT_APP_PAWGRESS_API_HOST;
  const fetchData = async () => {

    const userURL = `${baseUrl}/api/accounts/${tokenUser.user.id}`;

    const petsURL = `${baseUrl}/api/pets`;

    const [userResponse, petsResponse] = await Promise.all([
      fetch(userURL, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(petsURL, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    if (userResponse.ok && petsResponse.ok) {
      const userData = await userResponse.json();
      const petsData = await petsResponse.json();

      const filteredPets = petsData.filter(
        (pet) => pet.owner_id === parseInt(tokenUser.user.id)
      );
      setUser(userData);
      setPets(filteredPets);
    } else {
      console.log("Error fetching data");
    }
  };

  useEffect(() => {
    if (tokenUser.user !== null) {
      fetchData();
    }
  }, [tokenUser.user]);

  return (
    <div className="w-full cs-main-component">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/37/666/486/winter-look-face-snow-pose-hd-wallpaper-preview.jpg)`,
          opacity: 0.5,
          backgroundPosition: "left",
        }}
      ></div>
      <div className="max-w-xl mx-auto my-10 bg-white rounded-lg shadow-xl p-5">
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
              <div className="flex flex-wrap justify-evenly items-center justify-between mt-2">
                {pets.map((pet) => (
                  <a
                    key={"p" + pet.pet_id}
                    href={`/pawgress/customers/${user.id}/${pet.pet_id}`}
                    className="flex flex-col items-center mt-2 m-4"
                  >
                    <img
                      className="w-20 h-20 rounded-full mb-2"
                      src={pet.picture}
                      alt="Pet"
                    />
                    <p className="text-center text-xl font-semibold">
                      {pet.name}
                    </p>
                  </a>
                ))}
                <div className="flex items-center">
                  <NavLink
                    to={`/customers/${user.id}/addpet`}
                    className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <AiOutlinePlusCircle size={30} />
                  </NavLink>
                </div>
              </div>
              <NavLink
                to={`/customers/${user.id}/edit`}
                className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <BiEditAlt />
                <span>Edit</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
