
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { useAuth } from "../auth/AuthProvider";

function Profile() {
  const authContext = useAuth();
  console.log(authContext)

  function profileCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Info</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p>Email: {authContext?.user?.email}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  }
  return <div>Profile{authContext?.user !== undefined && profileCard()}</div>;
}

export default Profile;
