import React from "react";
export interface IconInputPropsTypes {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconSrc: string;
  name: string;
  type?: string;
}
