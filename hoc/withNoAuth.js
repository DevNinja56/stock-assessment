import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
// Adjust the path to your useAuth hook

const withNoAuth = (Component, redirectTo = "/dashboard") => {
  return function WithNoAuth(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.replace(redirectTo); // Redirects to the dashboard if the user is logged in
      }
    }, [user, loading, router]);

    // Render nothing while checking the auth state
    if (loading) {
      return <div>Loading...</div>; // Or any other loading indicator you prefer
    }

    // Render the component if not loading and no user is logged in
    if (!user) {
      return <Component {...props} />;
    }

    // Optionally, you could render null or a minimal layout if the user state is determined but the user is logged in
    return null;
  };
};

export default withNoAuth;
