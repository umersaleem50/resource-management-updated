// // const { Paragraph } = require("../../Typography/Typography");
// import { useEffect, useRef, useState } from "react";
// import { Paragraph } from "../../Typography/Typography";
// import classes from "./Notification.module.scss";

// let notificationRef;
// let barRef;
// let TIMER_MILISECONDS = 3000;
// let messageRef;
// let timerInterval;

// const Notification = (props) => {
//   notificationRef = useRef();
//   messageRef = useRef();
//   barRef = useRef();

//   useEffect(() => {
//     return () => clearInterval(timerInterval);
//   }, []);

//   if (props.timer) TIMER_MILISECONDS = props.timer;

//   return (
//     <div className={classes.Notification} ref={notificationRef}>
//       <Paragraph ref={messageRef} color="var(--color-white)">
//         {props.message || props.children}
//       </Paragraph>
//       <div className={classes.Notification__Bar} ref={barRef}></div>
//     </div>
//   );
// };

// export const showNofication = (
//   message,
//   messageType = "success",
//   callback = () => {}
// ) => {
//   messageRef.current.textContent = message;

//   notificationRef.current.classList.add(
//     classes[`Notification__${messageType}`]
//   );
//   notificationRef.current.classList.add(classes.Notification__Show);
//   barRef.current.style.transition = `all ${TIMER_MILISECONDS / 1000}s`;
//   barRef.current.classList.add(classes.Notification__Bar__Show);

//   timerInterval = setTimeout(() => {
//     notificationRef.current.classList.remove(classes.Notification__Show);
//     barRef.current.classList.remove(classes.Notification__Bar__Show);
//     notificationRef.current.classList.remove(
//       classes[`Notification__${messageType}`]
//     );
//     callback();
//   }, TIMER_MILISECONDS);
// };

// export default Notification;
