import React, { useEffect, useState, memo } from 'react';
import flStyle from './FriendsList.module.scss';
import FriendItem from './FriendItem/FriendItem.jsx';
import { getUsersFriendsList } from '../../../../../api/profileService.js';

const FriendsList = ({ userId }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsersFriendsList( userId ).then((data) => {
            setFriendsList(data || []); // Дефолтне значення на випадок, якщо дані пусті
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching friends:', error);
            setLoading(false);
        }).finally(() => {
            console.log('Friends list fetched successfully', friendsList);
        });
    }, [userId]);

    if (loading) {
        return <div>Loading friends list...</div>;
    }

    if (friendsList.length === 0) {
        return <div className={flStyle.noFriends}>No friends found</div>;
    }

    return (
        <div className={flStyle.friendsListContainer}>
            {friendsList.map((friend) => (
                <MemoizedFriendItem key={friend.id} friend={friend} />
            ))}
        </div>
    );
};

const MemoizedFriendItem = memo(FriendItem);

export default FriendsList;
