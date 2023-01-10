export const FormInput = (props) => {

  const {type, name, id, placeholder, changeHandler, value} = props.data;

  return <input
    type={type}
    name={name}
    id={id}
    placeholder={placeholder}
    onChange={changeHandler}
    value={value}
    className="border border-stone-300 w-full rounded py-2 px-5 h-12"
  />
}