import React, { useEffect, useState, memo } from 'react';
import flStyle from './FriendsList.module.scss';
import FriendItem from './FriendItem/FriendItem.jsx';
import { getUsersFriendsList } from "@/api/ClientServices/profileService.js";

const FriendsList = ({ userId, myId }) => {
    const [friendsList, setFriendsList] = useState([]);
    const [myFriendsList, setMyFriendsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const [profileFriends, myFriends] = await Promise.all([
                    getUsersFriendsList(userId),
                    getUsersFriendsList(myId),
                ]);

                setFriendsList(profileFriends || []);
                setMyFriendsList(myFriends || []);
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [userId, myId]);

    if (loading) {
        return <div>Loading friends list...</div>;
    }

    if (friendsList.length === 0) {
        return <div className="no_Items_Found">No friends yet</div>;
    }

    return (
        <div className={flStyle.friendsListContainer}>
            {friendsList.map((friend) => {
                const isMe = friend.followedId === myId;
                const isFollowing = myFriendsList.some(myFriend => myFriend.followedId === friend.followedId);

                return (
                    <MemoizedFriendItem
                        key={friend.id}
                        friend={friend}
                        isMe={isMe}
                        isFollowing={isFollowing}
                        myId={myId}
                    />
                );
            })}
        </div>
    );
};

const MemoizedFriendItem = memo(FriendItem);

export default FriendsList;


// import React, { useEffect, useState, memo } from 'react';
// import flStyle from './FriendsList.module.scss';
// import FriendItem from './FriendItem/FriendItem.jsx';
// import {getUsersFriendsList} from "@/api/ClientServices/profileService.js";
//
// const FriendsList = ({ userId, myId }) => {
//     const [friendsList, setFriendsList] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         getUsersFriendsList( userId ).then((data) => {
//             setFriendsList(data || []); // Дефолтне значення на випадок, якщо дані пусті
//             setLoading(false);
//         }).catch((error) => {
//             console.error('Error fetching friends:', error);
//             setLoading(false);
//         }).finally(() => {
//             console.log('Friends list fetched successfully', friendsList);
//         });
//     }, [userId]);
//
//     if (loading) {
//         return <div>Loading friends list...</div>;
//     }
//
//     if(friendsList.length === 0){
//         return <div className="no_Items_Found">No friends yet</div>;
//     }
//
//     return (
//         <div className={flStyle.friendsListContainer}>
//             {friendsList.map((friend) =>
//                 friend.followedId === myId
//                     ? <MemoizedFriendItem key={friend.id} friend={friend} isMe={true}/>
//                     : <MemoizedFriendItem key={friend.id} friend={friend} isMe={false}/>
//             )}
//         </div>
//     );
// };
//
// const MemoizedFriendItem = memo(FriendItem);
//
// export default FriendsList;
