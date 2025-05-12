'use client';

import style from "./OtherUserProfile.module.scss";
import { useAuth } from "@/context/AuthContext.js";
import UserInfo from "@/components/Profile/OtherUserProfile/UserInfo/UserInfo.jsx";
import UserStats from "@/components/Profile/OtherUserProfile/UserStats/UserStats.jsx";
import GameLibrary from "@/components/Profile/OtherUserProfile/GameLibrary/GameLibrary.jsx";
import Loader from "@/components/ui/Loader/Loader.jsx";
import React, {useEffect, useState} from "react";
import { useParams } from 'next/navigation';
import {getUserProfileByIdentifier, getUsersFriendsList} from "@/api/ClientServices/profileService.js";

const UserProfile = () => {
    const { user } = useAuth();     //Я
    const params = useParams();
    const userUrl = params.userUrl;     //URL з адреси
    const [otherUser, setOtherUser] = useState(null);   // Інший користувач
    const [loading, setLoading] = useState(true);
    const [isMyFriend, setIsMyFriend] = useState(false); // Змінна для перевірки, чи є я другом
    const [friendshipRecordId, setFriendshipRecordId] = useState(null); // Змінна для зберігання ID
                                                                                  // запису дружби яякщо є другом

    useEffect(() => {
        const loadProfileAndCheckFriend = async () => {
            if(!userUrl) return;
            setLoading(true);

            try {
                const fetchedUser = await getUserProfileByIdentifier(userUrl);
                setOtherUser(fetchedUser);
                console.log('Fetched user:', fetchedUser);
                console.log('My user:', user);
                // Тепер коли і я, і інший користувач завантажені, можна перевіряти
                if (user && fetchedUser) {
                    const friendsList = await getUsersFriendsList(user.id);
                    console.log('Friends list:', friendsList);

                    if (friendsList && Array.isArray(friendsList)) {
                        const matchedFriend = friendsList.find(friend => friend.followedId === fetchedUser.id);
                        if(matchedFriend) {
                            setIsMyFriend(true);
                            setFriendshipRecordId(matchedFriend.id);
                            console.log('Is my friend:', isMyFriend);
                        }
                    }
                }
            } catch (error) {
                console.error('Помилка завантаження профілю або перевірки друга:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userUrl) {
            loadProfileAndCheckFriend();
        }
    }, [userUrl, user]);

    if (loading) {
        return <Loader />;
    }

    if (!otherUser || !user) {
        return <div className="no_Items_Found">Профіль не знайдено</div>;
    }

    return (
        <div className={style.profileContainer}>
            <UserInfo user={otherUser} myId={user.id} isIFollowing={isMyFriend} recordId={friendshipRecordId}/>
            <UserStats userId={otherUser.id} myId={user.id}/>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span className="sectionTitle">User Library</span>
                <GameLibrary userId={otherUser.id}/>
            </div>
        </div>
    );
};

export default UserProfile;
