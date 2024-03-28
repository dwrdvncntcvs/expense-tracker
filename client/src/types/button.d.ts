import type { ButtonRound, ButtonType, Color, Size, Width } from "./component";

export interface ButtonProp {
    type: ButtonType;
    padding: Size;
    round: ButtonRound;
    color: Color;
    fontSize: Size;
    width: Width;
}

export interface ButtonMenuOption {
    label: string;
    onClick: () => void;
}
