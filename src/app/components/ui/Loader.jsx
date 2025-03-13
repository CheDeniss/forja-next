import React from 'react';
import loaderStyles from '../../styles/ui/Loader.module.scss';

const Loader = ({isLoading}) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className={loaderStyles.loaderOverlay}>
            <span className={loaderStyles.loaderSpinner}></span>
        </div>
    );
};

export default Loader;
