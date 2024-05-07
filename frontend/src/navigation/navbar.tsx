import { Home, User } from "lucide-react";
import { Button } from "../@/components/ui/button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="h-20 w-full flex justify-between p-5">
      <p className="text-3xl font-semibold tracking-tight transition-colors">
        Kanji Kit
      </p>
      <div>
        <Link to="/login/">
          <Button variant="outline" size="icon" className="mx-1">
            <User className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="icon" className="mx-1">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
