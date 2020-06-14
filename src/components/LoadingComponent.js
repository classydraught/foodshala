import React from "react";
import { CubeSpinner } from "react-spinners-kit";

export const Loading = () => {
    return (
        <div className="col-12">
            <CubeSpinner size={50} frontColor="#FF5733" backColor="grey" />
        </div>
    );
};
