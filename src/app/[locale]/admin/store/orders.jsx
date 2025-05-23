import React from 'react';
import ErrorScreen from "@/components/ui/ErrorScreen/ErrorScreen.jsx";

const MyComponent = () => {
    return (
        <div>
            <ErrorScreen error={"Якась хуйня..."} reset={1}/>

        </div>
    );
};

export default MyComponent;
