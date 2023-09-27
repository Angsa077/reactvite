import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const AuthLayout = (props) => {
    const { children, title, type } = props;
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
    {
        console.log(isDarkMode);
    }
    return (
        <div className={`flex justify-center min-h-screen items-center ${isDarkMode && "bg-slate-800 text-white"}`}>
            <div className="w-full max-w-xs">
                <button
                    className="absolute right-2 top-2 bg-yellow-300 p-2 text-white rounded"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? "Light" : "Dark"}
                </button>
                <h1 className="text-3xl font-bold mb-2 text-yellow-300">{title}</h1>
                <p className={`font-medium text-slate-500 mb-8 ${isDarkMode && "text-white"}`}>
                    Welcome, please enter your details
                </p>
                {children}
                <Navigation type={type} />
            </div>
        </div>
    )
}

const Navigation = ({ type }) => {
    if (type === "login") {
        return (
            <p className="text-sm mt-5 text-center">
                Don't have an account? {" "}
                <Link to="/register" className="font-bold text-yellow-300">
                    Register
                </Link>
            </p>
        );
    } else {
        return (
            <p className="text-sm mt-5 text-center">
                Already have an account? {" "}
                <Link to="/login" className="font-bold text-yellow-300">
                    Login
                </Link>
            </p>
        )
    }
}

export default AuthLayout;