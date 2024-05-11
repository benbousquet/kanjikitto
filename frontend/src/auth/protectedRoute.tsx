import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import LoginModal from "./loginModal";

export default function ProtectedRoute({ children }: any) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [retrievedAuth, setRetrievedAuth] = useState<boolean>(false);
  const authContext = useAuth();
  useEffect(() => {
    async function fetchData() {
      const user = await authContext?.getUser();
      if (user !== undefined) {
        setIsAuth(true);
      }
      setRetrievedAuth(true);
      console.log(user)
    }
    fetchData();
  }, []);
  console.log(isAuth)

  function content() {
    return (
      <>
        <LoginModal isAuth={isAuth} setIsAuth={setIsAuth} />
        {isAuth && children}
      </>
    );
  }
  return <>{retrievedAuth && content()}</>;
}