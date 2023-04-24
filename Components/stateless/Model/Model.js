import { Drawer } from "@mui/material";
import PropsType from "prop-types";

const Model = (props) => {
  // const [isToggle, setIsToggle] = useState(props.toggle || false);
  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setIsToggle(true);
  // };
  return (
    <Drawer open={props.toggle} anchor="right" onClose={props.onClose}>
      {props.children}
    </Drawer>
  );
};

Model.propTypes = {
  toggle: PropsType.bool,
  onClose: PropsType.func,
};

export default Model;
