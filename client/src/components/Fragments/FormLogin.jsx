import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button/Index";
import InputForm from "../Elements/Input/Index";
import { login } from "../../services/AuthService";

const FormLogin = () => {
    const [loginFailed, setLoginFailed] = useState("");
    const handleLogin = (event) => {
        event.preventDefault();
        // simpan data login ke localStorage
        // localStorage.setItem('email', event.target.email.value)
        // localStorage.setItem('password', event.target.password.value)
        // window.location.href = '/products';
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        login(data, (status, res ) => {
            if(status){
                localStorage.setItem('token', res);
                window.location.href = '/products';
            } else {
                setLoginFailed(res.response.data.message);
            }
        });
    };
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                ref={emailRef}
            />
            <InputForm
                label="Password"
                type="password"
                placeholder="******"
                name="password"
            />
            <Button classname="bg-yellow-300 w-full" type="submit">Login</Button>
            {loginFailed && <p className="text-red-500 text-center mt-5">{loginFailed}</p>}
        </form>
    )
}

export default FormLogin;