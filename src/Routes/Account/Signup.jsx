import Account from "../../components/Register/account";

const Data = {
    name: 'Create Account',
    description: 'Hey, Enter your details to get Sign up your account',
    localSubmit: 'Create',
    formText1: 'or Sign up with',
    formText2: 'Have an account?',
    formText3: 'Signin Now',
    route: 'login'
  }

const Signup = () => {
  return(
    <>
      <Account data={Data}/>
    </>
  )
}

export default Signup