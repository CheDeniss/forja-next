import React from 'react';
import ErrorScreen from "@/app/components/ui/ErrorScreen/ErrorScreen.jsx";

const MyComponent = () => {
    return (
        <div>
            <ErrorScreen error={{message: "Сталася якась хуйня і ми не знаэмо, що з цим робити..."}} reset={1}/>
        </div>
    );
};

export default MyComponent;
