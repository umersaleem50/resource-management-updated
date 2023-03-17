import { forwardRef, useRef } from "react";
import { Heading_Large } from "../../Typography/Typography";
import { MultiTextBox } from "../../Input/TextInput/TextInput";
import { BtnFull } from "../../Input/Buttons/Button";

const SendReportModel = forwardRef((props, ref) => {
  const descriptionRef = useRef();
  const submitForm = (e) => {
    e.preventDefault();
    props.sendReportRequest(descriptionRef.current.value);
  };
  return (
    <form onSubmit={submitForm}>
      <Heading_Large>Send Report</Heading_Large>
      <MultiTextBox
        label="Description for report"
        ref={descriptionRef}
      ></MultiTextBox>
      <BtnFull>Send report</BtnFull>
    </form>
  );
});

export default SendReportModel;
