import React from "react";
import "components/DayListItem.scss";
var classnames = require("classnames");
export default function DayListItem(props) {
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  function formatsSpots(props) {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  }
  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayListItemClass}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatsSpots(props)}</h3>
    </li>
  );
}
