import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../@/components/ui/alert-dialog";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

export default function LoginModal({
  isAuth,
  setIsAuth,
}: {
  isAuth: boolean;
  setIsAuth: (boolean: any) => void;
}) {
  const [loginURL, setLoginURL] = useState<string>();
  const authContext = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoginURL((await authContext?.getLoginURL()) || "");
    }
    fetchData();
  }, []);
  return (
    <AlertDialog open={!isAuth} onOpenChange={setIsAuth}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Login is required to access this page
          </AlertDialogTitle>
          <AlertDialogDescription>
            Login is provided through Kinde
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              window.open(loginURL, "_blank");
            }}
          >
            Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
