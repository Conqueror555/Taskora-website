import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";


const UserContext = React.createContext();

// set axios to include credentials with every request
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl ="https://taskora-website.onrender.com";

  const router = useRouter();
  const pathname = usePathname(); 
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
       toast.error(error?.response?.data?.message || error.message || "Something went wrong");

    }
  };

  // login the user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User logged in successfully");

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // refresh the user details
      const isLoggedIn = await userLoginStatus(); // checks cookie

    if (isLoggedIn) {
      await getUser(); // fetch user info
      router.push("/"); // only redirect if login validated
    } else {
      toast.error("Login token not accepted — check cookies/settings.");
    }
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  // get user Looged in Status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true, // send cookies to the server
      });

      // coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  // logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });
      
      
      setUser({}); 
      toast.success("User logged out successfully");

      
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");

    }
  };

  // get user details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });
         console.log("✅ /api/v1/user called, user:", res.data);


      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
       toast.error(error?.response?.data?.message || error.message || "Something went wrong");

    }
  };

  // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true, // send cookies to the server
      });

      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
       toast.error(error?.response?.data?.message || error.message || "Something went wrong");

    }
  };

  // email verification
  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-email`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Email verification sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
       toast.error(error.response.data.message || "Something went wrong");
    }
  };

  // verify user/email
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/verify-user/${token}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User verified successfully");

      // refresh the user details
      getUser();

      setLoading(false);
      // redirect to home page
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
      setLoading(false);
    }
  };

  // forgot password email
  const forgotPasswordEmail = async (email) => {
  try {
    setLoading(true); // Move inside try for cleaner error fallback

    const res = await axios.post(
      `${serverUrl}/api/v1/forgot-password`,
      { email },
      {
        withCredentials: true,
      }
    );

    toast.success(res.data.message || "Forgot password email sent successfully");
  } catch (error) {
    console.error("Error sending forgot password email", error);
    toast.error(
      error?.response?.data?.message || error.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};


  // reset password
  const resetPassword = async (token, password) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/auth/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password reset successfully");
      setLoading(false);
      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("Password changed successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
      setLoading(false);
    }
  };

  // admin routes
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
      setLoading(false);
    }
  };

  // dynamic form handler
  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // delete user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${serverUrl}/api/v1/admin/users/${id}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User deleted successfully");
      setLoading(false);
      // refresh the users list
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
       toast.error(error.response.data.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Get current path

useEffect(() => {
  const loginStatusGetUser = async () => {
    const isLoggedIn = await userLoginStatus();

    if (isLoggedIn) {
      await getUser();
    }
  };

  // Run login status check on all routes except public ones
  const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
  if (!publicPaths.includes(pathname)) {
    loginStatusGetUser();
  }
}, [pathname]);


  useEffect(() => {
  const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  const userIsEmpty = !user || Object.keys(user).length === 0;
  // Redirect only if the user is not logged in AND on a protected route
   if (!loading && userIsEmpty  && !isPublic) {
    console.log("🔁 Redirecting to login due to missing user ID");
    router.push("/login");
  }
}, [user, loading, pathname, router]);



  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        loading,
        updateUser,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
