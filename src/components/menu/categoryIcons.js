import vegan from "../../assets/icons/vegan.png";
import spicy from "../../assets/icons/chili.png";
import dairy from "../../assets/icons/dairy.png";
import nuts from "../../assets/icons/nuts.png";
import lowCalories from "../../assets/icons/low-calories.png";
import lunch from "../../assets/icons/lunch.png";
import dinner from "../../assets/icons/dinner.png";
import breakfast from "../../assets/icons/breakfast.png";
import drinks from "../../assets/icons/drinks.png";
import React from "react";

const categoryIcons = {
  breakfast: (
    <img alt={"breakfast"} src={breakfast} width={"16px"} height={"16px"} />
  ),
  lunch: <img alt={"lunch"} src={lunch} width={"16px"} height={"16px"} />,
  dinner: <img alt={"dinner"} src={dinner} width={"16px"} height={"16px"} />,
  drinks: <img alt={"drinks"} src={drinks} width={"16px"} height={"16px"} />,
  vegan: <img alt={"vegan"} src={vegan} width={"16px"} height={"16px"} />,
  spicy: <img alt={"spicy"} src={spicy} width={"16px"} height={"16px"} />,
  dairy: <img alt={"dairy"} src={dairy} width={"16px"} height={"16px"} />,
  nuts: <img alt={"nuts"} src={nuts} width={"16px"} height={"16px"} />,
  "low-calorie": (
    <img
      alt={"low calories"}
      src={lowCalories}
      width={"16px"}
      height={"16px"}
    />
  ),
};

export default categoryIcons;
