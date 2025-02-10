import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useConfirmNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    // Function to confirm navigation

    // Add event listener when the component mounts
    window.addEventListener("beforeunload", handleNavigation);

    // Clean up the event listener when the component unmounts or location changes
    return () => {
      window.removeEventListener("beforeunload", handleNavigation);
    };
  }, [location, navigate]); // Re-run effect if these dependencies change

  return { handleNavigation };
}

export default useConfirmNavigation;
