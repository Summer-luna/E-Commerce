export const Button = (props) => {

  const {type, clickHandler, style} = props.data;

  const buttonStyle = () => {
    switch (style){
      case "outlined":
        return "outlined-btn";
      case "filled":
        return "amber-btn"
    }
  }

  return <button type={type} className={buttonStyle()} onChange={clickHandler}>{props.children}</button>
}