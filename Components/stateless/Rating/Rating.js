import classes from "./Rating.module.scss";
import {
  BsStarFill as StarFull,
  BsStarHalf as StarHalf,
  BsStar as StarEmpty,
} from "react-icons/bs";
import { Paragraph, Title_Bold } from "../../Typography/Typography";
const Rating = (props) => {
  const fullRating = props.rating;
  const absoluteRating = Math.floor(fullRating);
  const remainingRating = fullRating - absoluteRating;
  const emptyStars = 5 - Math.ceil(fullRating);
  console.log(emptyStars, fullRating, absoluteRating, remainingRating);
  return (
    <div className={classes.Rating}>
      <div className={classes.Rating__Top}>
        <div className={classes.Rating__Stars}>
          {new Array(absoluteRating).fill(",").map((el, i) => {
            return <StarFull className={classes.Star} key={i} />;
          })}

          {remainingRating !== 0 && <StarHalf className={classes.Star} />}
          {emptyStars !== 0 &&
            new Array(emptyStars)
              .fill(",")
              .map((el, i) => (
                <StarEmpty
                  className={[classes.Star, classes.Star__empty].join(" ")}
                  key={i}
                />
              ))}
        </div>
        <Title_Bold color={"var(--color-font-grey)"}>
          {fullRating.toFixed(1)}/5
        </Title_Bold>
      </div>
      <Title_Bold color={"var(--color-font-grey)"}>
        Trusted by {props.ratingQuantity} members
      </Title_Bold>
    </div>
  );
};

export default Rating;
