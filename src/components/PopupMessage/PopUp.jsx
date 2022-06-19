import "./popup.scss";
import { Checkmark } from "grommet-icons";

const PopUp = ({title}) => {
  return(
    <div className="popup-container"  >
      <Checkmark color="white" className="StatusGood-icon" size="small" />
      <p>{title} added to your cart</p>
    </div>
  )
}

export default PopUp;