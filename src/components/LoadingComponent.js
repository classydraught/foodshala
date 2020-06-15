import React from "react";
import { CubeSpinner } from "react-spinners-kit";
import { MetroSpinner } from "react-spinners-kit";


export const Loading = () => {
    return (
        <div className="col-12">
            <CubeSpinner size={50} frontColor="#FF5733" backColor="grey" />
        </div>
    );
};
export const OrderLoading = () => {
    return (
        <div className="col-12">
            <MetroSpinner size={50} color="#16161d" />
        </div>
    );
};
