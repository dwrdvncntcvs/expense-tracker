type Column =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type TextSize = Size | "xxl" | "xxxl"

type InputType =
    | "color"
    | "date"
    | "email"
    | "month"
    | "number"
    | "password"
    | "text"
    | "time";

type ButtonType = "button" | "submit";

type Color =
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "success"
    | "failure"
    | "warning"
    | "light"
    | "normal"
    | "none"

type ColorBehavior = "inherit"

interface ColorClass {
    [key: string]: string;
}

type ButtonRound = Size | "xxl" | "xxxl" | "full";

type Width = Size | "full" | "none";

interface Dimension {
    width: Width;
    height: Width;
}

type Position = "start" | "center" | "end";

type FontWeight = "extralight" | "light" | "thin" | "normal" | "medium" | "semibold" | "bold" | "extrabold"

type Height = Size

interface SelectOption {
    value: string
    label: string
}

type Round = "left" | "right" | "none" | "both";


export {
    Column,
    Size,
    InputType,
    Color,
    ButtonType,
    ColorClass,
    Width,
    ButtonRound,
    Dimension,
    Position,
    FontWeight,
    TextSize,
    Height,
    SelectOption,
    Round,
    ColorBehavior
};
