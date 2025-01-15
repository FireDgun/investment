import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function useConfirmNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("PROLIFIC_PID");

  useEffect(() => {
    if (userId) {
      navigate("/?PROLIFIC_PID=" + userId, { replace: true });
    }
  }, [userId]);

  useEffect(() => {
    // Function to confirm navigation
    const handleNavigation = (event) => {
      event.preventDefault();
    };

    // Add event listener when the component mounts
    window.addEventListener("beforeunload", handleNavigation);

    // Clean up the event listener when the component unmounts or location changes
    return () => {
      window.removeEventListener("beforeunload", handleNavigation);
    };
  }, [location, navigate]); // Re-run effect if these dependencies change
}

export default useConfirmNavigation;
