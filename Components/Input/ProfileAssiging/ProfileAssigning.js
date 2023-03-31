import { Component, useState, useRef } from "react";
import Image from "next/image";
import { Paragraph } from "../../Typography/Typography";
import { AiOutlinePlus as IconPlus } from "react-icons/ai";
import { IoMdClose as IconClose } from "react-icons/io";
import classes from "./ProfileAssigning.module.scss";
import MiniProfile from "../../MiniProfile/MiniProfile";

const Profile = (props) => {
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
      <IconClose
        className={classes["Profile__Icon"]}
        onClick={() => props.onRemoveProfile()}
      />
    </div>
  );
};

const ProfileSearcher = (props) => {
  const [results, setResults] = useState([]);
  const [toggleInput, setToggleInput] = useState(false);
  const inputRef = useRef();

  const filterProfiles = (e) => {
    const filterdArr = props.profiles.filter((el, i) => {
      if (el.fullName.toLowerCase().includes(e.target.value.toLowerCase()))
        return true;

      return false;
    });
    setResults(filterdArr);
  };

  const onSelectResultItem = (obj) => {
    if (
      (props.selectedTeam && props.selectedTeam.includes(obj)) ||
      !props.selectedTeam
    )
      return setToggleInput(false);

    const newArr = [...props.selectedTeam];
    newArr.push(obj);
    props.setSelectedTeam(newArr);
    setToggleInput(false);
    console.log(props.selectedTeam);
  };

  const generateResults = (results) => {
    return results.map((el, i) => {
      return (
        <div
          className={classes["Result__Item"]}
          onClick={() => onSelectResultItem(el)}
        >
          <Image
            src={`/storage/images/profilePicture/${el.profilePicture}`}
            alt={el.fullName}
            width={25}
            height={25}
            objectFit="cover"
            className={classes["Profile__Image"]}
          />
          <Paragraph textTransform={"uppercase"}>{el.fullName}</Paragraph>
        </div>
      );
    });
  };

  const addAssignee = (e) => {
    e.preventDefault();
    setToggleInput((prev) => !prev);
    if (toggleInput === false) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={classes["ProfileSearcher"]}>
      <div className={classes["ProfileSearcher__Top"]}>
        <input
          type={"text"}
          ref={inputRef}
          className={[
            classes["ProfileSearcher__Input"],
            toggleInput ? classes["ProfileSearcher__Input--active"] : "",
          ].join(" ")}
          onChange={filterProfiles}
          autoComplete="off"
        />
        <button
          className={[
            classes["ProfileSearcher__Button"],
            toggleInput ? classes["ProfileSearcher__Button--active"] : "",
          ].join(" ")}
          onClick={addAssignee}
        >
          <IconPlus className={classes["ProfileSearcher__Icon"]} />
        </button>
      </div>
      <div className={classes["ProfileSearcher__Results"]}>
        {toggleInput && generateResults(results)}
      </div>
    </div>
  );
};

class ProfileAssigning extends Component {
  constructor(props) {
    super(props);
  }

  removeProfile(obj) {
    const selectedTeamArr = [...this.props.selectedTeam];
    const indexOfObj = selectedTeamArr.indexOf(obj);

    selectedTeamArr.splice(indexOfObj, 1);
    this.props.setSelectedTeam(selectedTeamArr);
  }

  generateProfiles(profile) {
    return profile.map((el, i) => {
      return (
        <MiniProfile
          key={i}
          profilePicture={el.profilePicture}
          alt={el.fullName + " profile-picture"}
          name={el.fullName}
          closeable
          onRemoveProfile={() => this.removeProfile(el)}
        />
      );
    });
  }

  render() {
    return (
      <div className={classes["ProfileAssigning"]}>
        {this.generateProfiles(this.props.selectedTeam)}

        <ProfileSearcher
          profiles={this.props.profiles}
          selectedTeam={this.props.selectedTeam}
          setSelectedTeam={this.props.setSelectedTeam}
        />
      </div>
    );
  }
}

export default ProfileAssigning;
