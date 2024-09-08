import React from "react";
import { LucideProps } from "lucide-react";
export interface IStatCard{
    name:string;
    icon:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    value:string;
    color:string;
}