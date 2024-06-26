import React, { useContext, useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaCalendarAlt,
    FaHeart,
    FaLightbulb,
    FaSmoking,
    FaWineGlassAlt,
    FaGraduationCap,
    FaImage,
    FaVideo,
    FaEnvelope,
    FaLock,
    FaPhone,
} from "react-icons/fa";
import "./Registration.scss";
import { ModalContext } from "../../ModelContextProvider/ModelContextProvider";
import Hobbies from "./Hobbies/Hobbies";
import Interests from "./Interests/Interests";
import SmokingHabbits from "./SmokingHabbits/SmokingHabbits";
import DrinkingHabbits from "./DrinkingHabbits/DrinkingHabbits";
import Qualification from "./Qualification/Qualification";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const { openModal, closeModal } = useContext(ModalContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mob: "",
        password: "",
        dob: "",
        age: "",
        hobbies: [],
        interest: [],
        smokingHabbits: "",
        drinkingHabbits: "",
        qualification: "",
        profilePicture: null,
        moreImages: [],
        reels: [],
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: name === "profilePicture" ? files[0] : Array.from(files),
        }));
    };

    const handleHobbies = () => {
        openModal(
            <Hobbies
                closeModal={closeModal}
                setSelectedHobbies={(hobbies) => setUserData((prevData) => ({ ...prevData, hobbies }))}
            />
        );
    };

    const handleInterests = () => {
        openModal(
            <Interests
                closeModal={closeModal}
                setSelectedInterests={(interest) => setUserData((prevData) => ({ ...prevData, interest }))}
            />
        );
    };

    const handleSmokingHabbits = () => {
        openModal(
            <SmokingHabbits
                closeModal={closeModal}
                setSelectedSmokingHabbits={(smokingHabbits) => setUserData((prevData) => ({ ...prevData, smokingHabbits }))}
            />
        );
    };

    const handleDrinkingHabbits = () => {
        openModal(
            <DrinkingHabbits
                closeModal={closeModal}
                setSelectedDrinkingHabbits={(drinkingHabbits) =>
                    setUserData((prevData) => ({ ...prevData, drinkingHabbits }))
                }
            />
        );
    };

    const handleQualification = () => {
        openModal(
            <Qualification
                closeModal={closeModal}
                setSelectedQualification={(qualification) => setUserData((prevData) => ({ ...prevData, qualification }))}
            />
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("this is my user data", userData);

        const formData = new FormData();

        formData.append("name", userData.name);
        formData.append("dob", userData.dob);
        formData.append("age", userData.age);
        formData.append("hobbies", JSON.stringify(userData.hobbies));
        formData.append("interest", JSON.stringify(userData.interest));
        formData.append("smokingHabbits", userData.smokingHabbits);
        formData.append("drinkingHabbits", userData.drinkingHabbits);
        formData.append("qualification", userData.qualification);
        formData.append("profilePicture", userData.profilePicture);
        userData.moreImages.forEach((image) => formData.append("moreImages", image));
        userData.reels.forEach((reel) => formData.append("reels", reel));

        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/registration", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                console.log("submitted successfully");
            }
        } catch (error) {
            console.error("Error :", error.message);
        }
        navigate('/employment')
    };

    return (
        <div className="registration-container">
            <h2>Registration Form</h2>
            <form className="registration-form">
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaUser />
                        </div>
                        <input
                            placeholder="Name:"
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaEnvelope />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Email:"
                            type="email"
                            value={userData.email}
                            name="email"
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaPhone />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Phone Number:"
                            type="text"
                            value={userData.mob}
                            name="mob"
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaLock />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Password:"
                            value={userData.password}
                            type="password"
                            name="password"
                        />
                    </label>
                </div>

                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaCalendarAlt />
                        </div>
                        <input
                            placeholder="DOB:"
                            type="date"
                            name="dob"
                            value={userData.dob}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaCalendarAlt />
                        </div>
                        <input
                            placeholder="Age:"
                            type="number"
                            name="age"
                            value={userData.age}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaHeart />
                        </div>
                        <input
                            onClick={handleHobbies}
                            placeholder="Hobbies:"
                            type="text"
                            value={userData.hobbies.join(", ")}
                            name="hobbies"
                            readOnly
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaLightbulb />
                        </div>
                        <input
                            onClick={handleInterests}
                            placeholder="Interest:"
                            value={userData.interest.join(", ")}
                            type="text"
                            name="interest"
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaSmoking />
                        </div>
                        <input
                            type="text"
                            name="smokingHabbits"
                            placeholder="Smoking Habits:"
                            value={userData.smokingHabbits}
                            onClick={handleSmokingHabbits}
                            readOnly
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaWineGlassAlt />
                        </div>
                        <input
                            type="text"
                            name="drinkingHabbits"
                            value={userData.drinkingHabbits}
                            onClick={handleDrinkingHabbits}
                            placeholder="Drinking Habits:"
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaGraduationCap />
                        </div>
                        <input
                            type="text"
                            name="qualification"
                            placeholder="Higher Qualification:"
                            value={userData.qualification}
                            onClick={handleQualification}
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaImage />
                        </div>
                        Add Profile Picture:
                        <input type="file" name="profilePicture" onChange={handleFileChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaImage />
                        </div>
                        Add More Images:
                        <input type="file" name="moreImages" multiple onChange={handleFileChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaVideo />
                        </div>
                        Add Short Reels: &nbsp;
                        <input type="file" name="reels" multiple onChange={handleFileChange} />
                    </label>
                </div>
                <div className="form-row">
                    <button onClick={handleSubmit} className="btn" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registration;
