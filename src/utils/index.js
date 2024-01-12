/* eslint-disable no-unused-vars */
import axios from "axios";
import { SetPosts } from "../reduxSlice/postSlice";
import validator from "validator";

const VITE_API_START_POINT = import.meta.env.VITE_API_START_POINT;
const VITE_APP_CLOUDINARY_ID = import.meta.env.VITE_APP_CLOUDINARY_ID;

export const API = axios.create({
  baseURL: VITE_API_START_POINT,
  responseType: "json",
});

// all export function here follows similar pattern - by making get or post request to the server
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    return { status: err.success, message: err.message };
  }
};
/**
 * Handles the upload of a file to the Cloudinary storage service.
 * */
export const handleFileUpload = async (uploadFile) => {
  // Create a FormData object to prepare the file for upload
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "memories");

  try {
    // Send a POST request to Cloudinary's API for image upload
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${VITE_APP_CLOUDINARY_ID}/image/upload/`,
      formData
    );
    // Return the secure URL of the uploaded file from the Cloudinary response
    return response.data.secure_url;
  } catch (error) {
    // Log any errors that occur during the file upload process
    console.log(error);
  }
};

/**
 * Fetches posts from the server and dispatches an action to update the Redux state.
 * param {string} token - User authentication token.
 * param {function} dispatch - Redux dispatch function.
 * param {string} uri - API endpoint for fetching posts. Defaults to "/posts".
 * param {object} data - Additional data to be sent in the request body. Defaults to an empty object.
 */
export const fetchPosts = async (token, dispatch, uri, data) => {
  try {
    // Make an API request to fetch posts
    const res = await apiRequest({
      url: uri || "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });
    // Dispatch the SetPosts action to update the Redux state with the fetched posts
    dispatch(SetPosts(res?.data));
    return;
  } catch (error) {
    // Log any errors that occur during the fetchPosts operation
    console.log(error);
  }
};

/**
 * Handles the process of liking a post by making an API request.
 * p
 * param {string} uri - The URI of the post to be liked.
 * param {string} token - User authentication token for the API request.
 * returns A promise that resolves with the API response or rejects with an error.
 */
export const likePost = async ({ uri, token }) => {
  try {
    // Make an API request to like the specified post
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    // Return the API response
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Deletes a post by making a DELETE request to the API endpoint.
 * param {string} id - The ID of the post to be deleted.
 * param {string} token - User authentication token for authorization.
 * returns A Promise void indicating the completion of the delete operation.
 */
export const deletePost = async (id, token) => {
  try {
    // Send a DELETE request to the API endpoint for the specified post ID
    const res = await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });
    // The deletion was successful, no need to return anything
    return;
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.log(error);
  }
};

/**
 * Retrieves user information from the server based on the provided token and optional user ID.
 * If user ID is undefined, it fetches the information of the authenticated user.
 * If authentication fails, it clears the user data from loval storage, alerts the user, and redirects to the login page.
 * param {string} token - User authentication token.
 * param {string|undefined} id - Optional user ID. If undefined, fetches information of the authenticated user.
 * returns User information object or undefined if an error occurs.
 */
export const getUserInfo = async (token, id) => {
  try {
    // Determine the URI based on the presence of user ID
    const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;

    // Make an API request to fetch user information
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    // Handle authentication failure
    if (res?.message === "Authentication failed") {
      // Clear user data from local storage
      localStorage.removeItem("user");

      // Alert the user about the session expiration and redirect to the login page
      window.alert("Session expired. Please Login again");
      window.location.replace("/login");
    }
    // Return user information if available
    return res?.user;
  } catch (error) {
    // Log any errors that occur during the API request
    console.log(error);
  }
};

/**
 * function to send a friend request to a user with the specified ID.
 * param {string} token - The user's authentication token.
 * param {string} id - The ID of the user to whom the friend request is being sent.
 * returns a void Promise that resolves when the request is successful, or rejects on error.
 */
export const sendFriendRequest = async (token, id) => {
  try {
    // Make an API request to send a friend request
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
    // The friend request was successfully sent
    return;
  } catch (error) {
    // Log any errors that occur during the request
    console.log(error);
  }
};

/**
 * function to send a request to the server to notify that the user's profile has been viewed.
 * This function is typically called when a user views another user's profile.
 * param {string} token - Authentication token of the current user.
 * param {string} id - ID of the user whose profile is being viewed.
 * returns {Promise<void>} that resolves when the request is successful.
 */
export const viewedUserProfile = async (token, id) => {
  try {
    // Send a request to the server to log the profile view
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });

    return;
  } catch (error) {
    // Log any errors that occur during the request
    console.log(error);
  }
};

/**
 * Retrieves comments for a specific post from the server.
 * param {string} id - The unique identifier of the post.
 * returns {Array} - An array containing the comments for the specified post.
 */
export const getPostComments = async (id) => {
  try {
    // Send a GET request to the server to fetch comments for the specified post
    const res = await apiRequest({
      url: "/posts/comments/" + id,
      method: "GET",
    });
    // Return the data received from the server (comments for the post)
    return res?.data;
  } catch (error) {
    // Log any errors that occur during the API request
    console.log(error);
  }
};

// Custom password validation function for enforcing strong password
export const validatePassword = (value) => {
  // custom strong password validation logic is here
  const valid = validator.isStrongPassword(value, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
  });
  // For example, check if the password contains a combination of uppercase, lowercase, numbers, and special characters
  return (
    valid ||
    "Password must be strong. Minimum of six characters having a Uppercase, Lowercase, Number and special symbols"
  );
};
// Custom email validation function
export const validateEmail = (value) => {
  // logic is here
  const valid = validator.isEmail(validator.trim(value), {
    ignore_max_length: true,
  });

  return valid || "Invalid email address";
};

// Helper function to check if the URL is a video
export const isImage = (url) =>
  /\.(jpg|jpeg|png)$/i.test(url) || /(\/png|\/jpg)$/i.test(url);

// Helper function to check if the URL is a video
export const isVideo = (url) =>
  /\.(mp4|mov)$/i.test(url) || /(\/mp4|\/mov)$/i.test(url);
