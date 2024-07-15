import { signOut } from "@/firebaseConfig";
import { useRouter } from "next/router"; // Adjust the path as needed
function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
