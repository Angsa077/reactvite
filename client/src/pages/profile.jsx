import { useLogin } from "../hooks/useLogin";

const ProfilePage = () => {
    const id = useLogin();
    return (
        <div>
            <h1>Profile</h1>
            Email : {id}
        </div>
    )
}

export default ProfilePage;
