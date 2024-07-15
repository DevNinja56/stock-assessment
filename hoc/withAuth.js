import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const withAuth = (Component) => {
  // Create a new component and assign a display name
  const AuthHOC = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [loading, router, user]);

    return loading ? <div>Loading...</div> : <Component {...props} />;
  };

  // Set a display name for better debugging
  AuthHOC.displayName = `WithAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthHOC;
};

export default withAuth;
