/* eslint-disable no-unused-vars */

// React imports
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { MdClose } from "react-icons/md";
import TextInput from "./TextInput";
import { BiImages } from "react-icons/bi";

// Custom Components
import Loading from "./Loading";
import CustomButton from "./CustomButton";

// Redux Actions
import { UpdateProfile, UserLogin } from "../reduxSlice/userSlice";
// Utility Functions
import { apiRequest, handleFileUpload } from "../utils";

const EditProfile = () => {
  // Redux state
  const { user } = useSelector((state) => state.user);
  //   set error message
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch(); // dispatch tools
  const [isSubmitting, setIsSubmitting] = useState(false);
  // state varaible to chek if the user selected a picture on profile update modal.
  const [picture, setPicture] = useState(null);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const updateMyProfile = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");

    try {
      // check if  user selected a picture and await the upload

      const uri = picture && (await handleFileUpload(picture));
      // Destructure form data
      const { firstName, lastName, location, profession } = data;

      // Make an API request to update user profile endpoint
      const res = await apiRequest({
        url: "/users/update-user",
        data: {
          firstName,
          lastName,
          location,
          profession,
          profileUrl: uri ? uri : user?.profileUrl,
        },
        method: "PUT",
        token: user?.token,
      });

      // manage API response
      if (res?.status === "failed") {
        // if the reponse status failed .. log a message
        setErrMsg(res);
      } else {
        // otherwise
        setErrMsg(res);
        // destructrure the token and user from the response and dispactch as user login  details for the state.
        // Update user information in the Redux state
        // the below action makes it possible for user to see the updated information in real time.
        const newUserData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newUserData));

        //Close the edit profile form after a successful update
        // after succesfully update set the edit profile from state to false
        setTimeout(() => {
          dispatch(UpdateProfile(false));
        }, 2000);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  // Function to close the edit profile modal / enables user to close the modal
  const handleCloseModal = () => {
    dispatch(UpdateProfile(false));
  };

  // Function to handle image selection
  const handleSelectImage = (ev) => {
    setPicture(ev.target.files[0]);
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed z-50 inset-0 overflow-y-auto">
        {/* Modal Content */}
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-[#000] opacity-70"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* modal title and close icon */}
            <div className="flex justify-between px-6 pt-5 pb-2">
              <label
                htmlFor="name"
                className="block font-medium text-xl text-ascent-1 text-left"
              >
                Edit Profile
              </label>
              <button className="text-ascent-1" onClick={handleCloseModal}>
                <MdClose size={22} />
              </button>
            </div>

            {/* edit profile form */}

            <form
              className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
              onSubmit={handleSubmit(updateMyProfile)}
            >
              {/* Input Fields */}
              {/* ... (re-using TextInput components) ... */}
              <TextInput
                name="firstName"
                placeholder="First Name"
                type="text"
                label="First Name"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                styles="w-full"
                error={errors.firstName ? errors.firstName?.message : ""}
              />
              <TextInput
                name="lastName"
                placeholder="Last Name"
                type="text"
                label="Last Name"
                register={register("lastName", {
                  required: "Last Name is required",
                })}
                styles="w-full"
                error={errors.lastName ? errors.lastNameName?.message : ""}
              />
              <TextInput
                name="profession"
                placeholder="Profession"
                type="text"
                label="Profession"
                register={register("profession", {
                  required: "Profession is required",
                })}
                styles="w-full"
                error={errors.profession ? errors.profession?.message : ""}
              />
              <TextInput
                name="Location"
                placeholder="Location"
                type="text"
                label="Location"
                register={register("location", {
                  required: "Location is required",
                })}
                styles="w-full"
                error={errors.location ? errors.location?.message : ""}
              />

              {/* profile picture upload */}

              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
              >
                <input
                  type="file"
                  className=""
                  id="imgUpload"
                  onChange={(ev) => handleSelectImage(ev)}
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg"
                />
              </label>

              {/* display error message if any */}
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status == "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              {/* display loading state */}
              <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                    title="Update"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
