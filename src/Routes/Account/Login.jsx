import Account from "../../components/Register/account";

const Data = {
  name: "Login",
  description: "Hey, Enter your details to get Sign in your account",
  localSubmit: "Sign in",
  formText1: "or Sign in with",
  formText2: "Don't have an account?",
  formText3: "Create Now",
  route: 'signup'
};

const Login = () => {
  return (
    <>
      <Account data={Data} />
    </>
  );
};

export default Login;
