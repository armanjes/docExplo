import { useAuth } from "../context/AuthContext"
const Profile = () => {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>This is profile page</h1>
      <p>name: {user?.name}</p>
      <p>email: {user?.email}</p>
      <p>role: {user?.role}</p>
    </div>
  );
}
export default Profile