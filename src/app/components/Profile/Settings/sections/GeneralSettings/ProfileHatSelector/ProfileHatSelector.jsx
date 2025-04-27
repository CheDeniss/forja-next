import React, {useEffect, useState} from 'react';
import styles from './ProfileHatSelector.module.scss';
import MinioImage from "@/app/components/ui/MinioImage/MinioImage.jsx";
import {getUserProfileHatImages, updateUserProfileHatVariant} from "@/api/profileService.js";
import {useModal} from "@/context/ModalContext.jsx";
import CustomButtonOther from "@/app/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import userInfoStyles from "@/app/components/Profile/UserInfo/UserInfo.module.scss";
import {Skeleton} from "@mui/material";

const ProfileHatSelector = ({user}) => {
    const imgNum = 21;

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selected, setSelected] = useState(null);
    const [images, setImages] = useState([]);
    const { showModal } = useModal();

    useEffect(() => {
        const fetchImages = async () => {
            let tempImages = [];

            for (let i = 1; i <= imgNum; i++) {
                try {
                    const path = await getUserProfileHatImages(i);
                    tempImages.push(path);
                } catch (error) {
                    showModal('error', { message: error.message });
                }
            }

            tempImages.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/));
                const numB = parseInt(b.match(/\d+/));
                return numA - numB;
            });

            setImages(tempImages);

            const variant = user.profileHatVariant;
            const initialIndex = variant && variant >= 1 && variant <= tempImages.length
                ? variant - 1
                : tempImages.length - 1;

            setSelected(tempImages[initialIndex]);
            setSelectedIndex(initialIndex + 1);

            console.log('Initial selected:', tempImages[initialIndex]);
            console.log('Initial selectedIndex:', initialIndex + 1);
        };

        fetchImages();
    }, [user.id]);


    const handleSaveClick = async () => {
        await updateUserProfileHatVariant(user.id, selectedIndex)
            .then(
                showModal({
                    modalType: 'success',
                    modalProps: {message: `Variant ${selectedIndex} was set.`}
                }))
            .catch((error) => {
                showModal({
                    modalType: 'error',
                    modalProps: {message: error.message}
                })
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.profHatContainer}>
                <div className={styles.preview}>
                    <div className={styles.overlay}>
                        <span className={styles.userDetailsUsername}>
                             {user.firstname || user.lastname ?
                            `${user.firstname ?? ""} ${user.lastname ?? ""}` : user.username}
                        </span>
                        <textarea className={styles.userDetailsBio} value={user.selfDescription}
                                  disabled={true}>
                        </textarea>
                        <div className={styles.userDetailsButtons}>
                            <CustomButtonOther>
                                Edit page
                            </CustomButtonOther>
                            <CustomButtonOther>
                                Logout
                            </CustomButtonOther>
                        </div>
                    </div>
                    <div className={styles.backgroundImage}>
                        {!selected && (
                            <Skeleton
                                variant="rectangular"
                                sx={{height: '100%', width: '100%'}}
                            />
                        )}
                        {selected && (
                            <MinioImage
                                src={selected || 'public/assets/fallbacks/default.png'}
                                alt="Profile Background"
                            />
                        )}
                    </div>

                </div>

                <div className={styles.gallery}>
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className={`${styles.thumb} ${selected === src ? styles.selected : ''}`}
                            onClick={() =>{
                                setSelected(src);
                                setSelectedIndex(index + 1 );
                        }}
                        >
                        <div>
                            <MinioImage src={src} alt={`Option ${index + 1}`}/>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
            <CustomButtonOther onClick={handleSaveClick}>Save Changes</CustomButtonOther>
        </div>
    );
};

export default ProfileHatSelector;
