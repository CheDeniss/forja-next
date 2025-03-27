import React from 'react';
import flStyle from './FriendsList.module.scss';
import FriendItem from "./FriendItem/FriendItem.jsx";

const FriendsList = () => {
    return (
        <div className={flStyle.friendsListContainer}>
            <FriendItem/>
            <FriendItem/>
            <FriendItem/>
            <FriendItem/>
            <FriendItem/>
            <FriendItem/>
        </div>
    );
};

export default FriendsList;
