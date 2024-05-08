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

export default function LoginModal({
  isAuth,
  setIsAuth,
}: {
  isAuth: boolean;
  setIsAuth: (boolean: any) => void;
}) {
  const authContext = useAuth();
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
          <AlertDialogCancel onClick={() => {}}>Home</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              authContext?.login();
            }}
          >
            Login
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
