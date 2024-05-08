import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import LoginModal from "./loginModal";

export default function ProtectedRoute({ children }: any) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const authContext = useAuth();
  useEffect(() => {
    const user = authContext?.getUser();
    if (user !== undefined) {
      setIsAuth(true);
    }
  }, []);

  console.log(isAuth);
  return (
    <>
      <LoginModal isAuth={isAuth} setIsAuth={setIsAuth} />
      {isAuth && children}
    </>
  );
}
