import { Drawer } from "@mui/material";
import PropsType from "prop-types";

const Model = (props) => {
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
