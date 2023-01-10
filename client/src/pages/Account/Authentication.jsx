import { Link, useNavigate } from "react-router-dom";
import { BsGoogle, BsFacebook } from "react-icons/bs";

import { useState, useContext } from "react";
import {AuthContext} from "../../Context/AuthContext";
import {FormInput} from "../../components/ui/FormInput";
import {Button} from "../../components/ui/Button";
import {axiosInstance} from "../../lib/axios";

const Authentication = ({status}) => {

    const [isAuth, setAuth] = useContext(AuthContext);
    const [user, setUser] = useState({
        username: "test@test.com",
        password: "test",
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(user)
        const response = await axiosInstance.post(`/${status}`, user, {withCredentials: true});
        const data = await response.data;

        if(data.auth){
            setAuth(true);
            navigate("/profile", { state: { isAuth: true } });
        }else {
            setAuth(false);
        }
    };

    const googleAuth = async () => {
        console.log("goggle");
        window.location = "https://stationary-store.onrender.com/auth/google";
    }

    const inputs = [
        {
            type:"email",
            name:"username",
            id:"email",
            placeholder:"Enter Email",
            changeHandler: changeHandler,
            value: user.username
        },
        {
            type:"password",
            name:"password",
            id:"password",
            placeholder:"Enter Password",
            changeHandler: changeHandler,
            value: user.password
        },
    ]

    return (
      <div className="flex flex-col justify-center items-center pt-40 px-10 w-96 mx-auto md:bg-white md:py-0 md:rounded md:px-5 md:mt-40">
              <form onSubmit={submitHandler} className="flex justify-center items-center flex-col ">
                  <h2 className="text-xl font-bold mb-5">{status==="signup" ? "Create Account" : "Login"}</h2>
                  <p className="break-words w-5/6">
                      {status==="signup"? "Hey, Enter your details to get Sign up your account" : "Hey, Enter your details to get Sign in your account"}
                  </p>
                  <div className="mt-8 w-full">
                      {
                        inputs.length > 0 && inputs.map((input, i) => {
                            return <div key={i} className="mb-5"><FormInput data={input} /></div>
                        })
                      }
                  </div>

                  <div className="mb-5 w-full"><Button data={{type: "submit", style: "outlined"}}>{ status === "signup" ? "Create" : "Login"}</Button></div>

                  <div className="w-full before:content-[''] before:bg-stone-200 before:w-full before:h-0.5 before:block flex flex-col gap-5 mb-5 items-center">
                      {status === "signup" ? "or Sign up with" : "or Sign in with"}
                  </div>
              </form>
                <div className="w-full">
                    <div className="mb-5 w-full relative" onClick={googleAuth}>
                        <BsGoogle className="social-icon absolute top-2.5 left-5" />
                        <Button data={{type: "submit", style: "filled"}}>
                            Google
                        </Button>
                    </div>

                    <div className="mt-5 w-full">
                        {status === "signup" ? "Have an account?" : "Don't have an account?"}
                        <Link to={status==="signup" ? "/login" : "/signup"} className="font-bold">{status==="signup"? " Signin Now" : " Create Now"}</Link>
                    </div>
                </div>
      </div>
    );
};

export default Authentication;
