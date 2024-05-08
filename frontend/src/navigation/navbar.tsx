import { Home, LogOut, User } from "lucide-react";
import { Button } from "../@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";

function Navbar() {
  function ProtectedNav() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const authContext = useAuth();
    useEffect(() => {
      async function fetchData() {
        const user = await authContext?.getUser();
        if (user !== undefined) {
          setIsAuth(true);
        }
      }
      fetchData();
    }, []);

    if (!isAuth) {
      return;
    }
    return (
      <>
        <Button
          variant="outline"
          size="icon"
          className="mx-1"
          onClick={async () => {
            await authContext?.logout();
          }}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </>
    );
  }
  return (
    <div className="h-20 w-full flex justify-between p-5">
      <p className="text-3xl font-semibold tracking-tight transition-colors">
        Kanji Kit
      </p>
      <div>
        <Link to="/">
          <Button variant="outline" size="icon" className="mx-1">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline" size="icon" className="mx-1">
            <User className="h-4 w-4" />
          </Button>
        </Link>
        <ProtectedNav />
      </div>
    </div>
  );
}

export default Navbar;
