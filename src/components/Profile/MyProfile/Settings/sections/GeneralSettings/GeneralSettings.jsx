'use client';

import styles from './GeneralSettings.module.scss';
import CustomButtonOther from "@/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import UploadAvatar from "@/components/Profile/MyProfile/Settings/sections/GeneralSettings/UploadAvatar/UploadAvatar.jsx";
import ProfileHatSelector
    from "@/components/Profile/MyProfile/Settings/sections/GeneralSettings/ProfileHatSelector/ProfileHatSelector.jsx";
import {useAuth} from "@/context/AuthContext.js";
import Loader from "@/components/ui/Loader/Loader.jsx";
import TextareaWithActions
    from "@/components/Profile/MyProfile/Settings/sections/GeneralSettings/TextareaWithActions/TextareaWithActions.jsx";
import {useState} from "react";
import {getUserProfileByIdentifier, getUsersFriendsList, startFollow, updateUserProfile} from "@/api/ClientServices/profileService.js";
import {useModal} from "@/context/ModalContext.jsx";

const GeneralSettings = () => {
    const { user } = useAuth();
    const { showModal } = useModal();

    const [formData, setFormData] = useState({
        name: user.firstname || '',
        lastname: user.lastname || '',
        userurl: user.customUrl || '',
    });

    const [followUrl, setFollowUrl] = useState('');

    if (!user) {
       return <Loader/>
    }

    const handleSaveCustomUrlNameLastname = async () => {
        try {
            const result = await getUserProfileByIdentifier(formData.userurl);
            if (result) {
                showModal({
                    modalType: 'error',
                    modalProps: {message: 'This custom URL is already taken.'}
                });
                setFormData(prev => ({...prev, userurl: ''}));
                return;
            }

            const updatedUser = {
                ...user,
                firstname: formData.name,
                lastname: formData.lastname,
                customUrl: formData.userurl,
                modifiedAt: new Date().toISOString()
            };

            try {
                await updateUserProfile(updatedUser);
                showModal({modalType: 'success', modalProps: {message: 'User updated!'}});
            } catch (error) {
                showModal({modalType: 'error', modalProps: {message: error.message}});
            }
        }catch (error) {
            showModal({modalType: 'error', modalProps: {message: error.message}});
        }
    };


    const handleSaveFindUser = async () => {
        if (followUrl === '') {
            showModal({
                modalType: 'error',
                modalProps: { message: 'Please enter a valid user URL.' }
            });
            return;
        }

        if (followUrl === user.customUrl) {
            showModal({
                modalType: 'error',
                modalProps: { message: 'You cannot follow yourself.' }
            });
            return;
        }

        try {
            const followedUser = await getUserProfileByIdentifier(followUrl);

            if (followedUser) {
                const myFriends = await getUsersFriendsList(user.id);
                if(myFriends.some(friend => friend.followedId === followedUser.id)) {
                    showModal({
                        modalType: 'error',
                        modalProps: { message: 'You are already following this user.' }
                    });
                    return;
                }
                await startFollow(user.id, followedUser.id);

                showModal({
                    modalType: 'success',
                    modalProps: {
                        message: `You are now following ${followedUser.firstname ? followedUser.firstname : ''} 
                              ${followedUser.lastname ? followedUser.lastname : ''} 
                              (${followedUser.customUrl})`
                    }
                });
            } else {
                showModal({
                    modalType: 'error',
                    modalProps: { message: 'User not found.' }
                });
            }
        } catch (error) {
            showModal({
                modalType: 'error',
                modalProps: { message: error.message }
            });
        }
    };


    const handleSaveDescription = async (text) => {
        const updatedUser = {
            ...user,
            selfDescription: text,
            modifiedAt: new Date().toISOString()
        };

        try {
            await updateUserProfile(updatedUser);
            showModal({ modalType: 'success', modalProps: { message: 'Description updated!' } });
        } catch (error) {
            showModal({ modalType: 'error', modalProps: { message: 'fgfgf' + error.message } });
        }
    }

    return (
        <div>
            <div className={styles.generalSettings}>
                <span className="sectionTitle">General Settings</span>
                <div className={styles.wrapper}>

                    {/* Custom URL */}
                    <div className={styles.field}>
                        <div className={styles.nameUrlContainer}>
                            <div>
                                <div className={styles.partContainer}>
                                    <label>DisplayName</label>
                                    <div className={styles.block}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="First name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                        }
                                        />
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="Last name"
                                            value={formData.lastname}
                                            onChange={(e) =>
                                                setFormData({ ...formData, lastname: e.target.value })
                                        }
                                        />
                                    </div>
                                    <div className={styles.buttonWrapper}>
                                        <CustomButtonOther onClick={handleSaveCustomUrlNameLastname}>Save Changes</CustomButtonOther>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.partContainer}>
                                <label>Custom URL</label>
                                <input
                                    type="text"
                                    name="userurl"
                                    placeholder="User URL"
                                    value={formData.userurl}
                                    onChange={(e) =>
                                        setFormData({...formData, userurl: e.target.value})
                                }
                                />
                                <p>Your profile will be available at: https://forja.com/@userurl</p>
                            </div>
                        </div>
                    </div>

                    {/* Find User */}
                    <div className={styles.field}>
                        <label>Find User</label>
                        <input
                            type="text"
                            placeholder="Enter your friend's userURL"
                            value={followUrl}
                            onChange={(e) => setFollowUrl(e.target.value)}
                        />
                        <div className={styles.buttonWrapper}>
                            <CustomButtonOther onClick={handleSaveFindUser}>Save Changes</CustomButtonOther>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.field}>
                        <label>Description</label>
                        <TextareaWithActions user={user} onClick={handleSaveDescription} formData={formData}/>
                    </div>

                    {/* Avatar */}
                    <div className={styles.field}>
                        <label>Avatar</label>
                        <UploadAvatar user={user}/>
                    </div>

                    {/* Profile hat */}
                    <div className={styles.field}>
                        <label>Profile hat</label>
                        <ProfileHatSelector user={user}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;
