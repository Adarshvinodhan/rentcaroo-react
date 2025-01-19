import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Adjust to "code" if using auth code flow

    if (token) {
      console.log("Extracted token:", token);
      try {
        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Redirect to the desired page
        window.location.href = "/cars"; 
      } catch (error) {
        console.error("Error storing token or navigating:", error);
        navigate("/"); // Redirect to login if there's an error
      }
    } else {
      // Token not found in URL
      console.error("No token found in URL");
      navigate("/"); // Redirect to login
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
    </div>
  );
};

export default GoogleCallback;
