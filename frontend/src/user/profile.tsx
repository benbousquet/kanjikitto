import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { UserContextInfo, useAuth } from "../auth/AuthProvider";

function Profile() {
  const authContext = useAuth();
  const [user, setUser] = useState<UserContextInfo>();
  useEffect(() => {
    async function fetchData() {
      const loggedInUser = await authContext?.getUser();
      setUser(loggedInUser);
    }
    fetchData();
  }, []);
  console.log("PROF");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Info</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>Email: {user?.email}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default Profile;
