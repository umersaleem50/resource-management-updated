import classes from "./MiniProfile.module.scss";
import Image from "next/image";
import { Paragraph } from "../Typography/Typography";
import { IoMdClose as IconClose } from "react-icons/io";

const MiniProfile = (props) => {
  return (
    <div className={classes["Profile"]}>
      <Image
        src={`/storage/images/profilePicture/${props.profilePicture}`}
        alt={props.alt}
        width={25}
        height={25}
        objectFit="cover"
        className={classes["Profile__Image"]}
      />
      <Paragraph textTransform="uppercase" color="var(--color-font)">
        {props.name}
      </Paragraph>
      {props.closeable && (
        <IconClose
          className={classes["Profile__Icon"]}
          onClick={() => props.onRemoveProfile()}
        />
      )}
    </div>
  );
};

export default MiniProfile;
