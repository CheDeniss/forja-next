import React, { useRef, useState } from 'react';
import styles from './UploadAvatar.module.scss';
import CustomButtonOther from "@/app/components/ui/CustomButtonOther/CustomButtonOther.jsx";
import {updateUserProfileHatVariant} from "@/api/profileService.js";
import {useModal} from "@/context/ModalContext.jsx";
import {uploadAvatar} from "@/api/Admin_Services/filesAdminService.js";

const UploadAvatar = ({ user }) => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const { showModal } = useModal();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveClick = async () => {
        const file = fileInputRef.current.files[0];
        if (!file) {
            showModal({
                modalType: 'error',
                modalProps: { message: 'Please select a file first.' }
            });
            return;
        }

        const formData = new FormData();
        formData.append('ObjectId', user.id);
        formData.append('File', file);
        formData.append('ObjectSize', file.size);
        formData.append('ContentType', file.type);
        formData.append('FileName', file.name);

        try {
            const result = await uploadAvatar(formData);
            showModal({
                modalType: 'success',
                modalProps: { message: `Avatar was set. ${result}` }
            });
        } catch (error) {
            showModal({
                modalType: 'error',
                modalProps: { message: error.message }
            });
        }
    };


    return (
        <div className={styles.uploadAvatarContainer}>
            <div className={styles.previewSection}>
                <div className={styles.previewLarge}>
                    {preview ? <img src={preview} alt="Large Preview" /> : <div className={styles.placeholder}>516px</div>}
                </div>
                <div className={styles.previewMedium}>
                    {preview ? <img src={preview} alt="Medium Preview" /> : <div className={styles.placeholder}>190px</div>}
                </div>
                <div className={styles.previewSmall}>
                    {preview ? <img src={preview} alt="Small Preview" /> : <div className={styles.placeholder}>64px</div>}
                </div>
                <div className={styles.uploadSection}>
                    <p>Upload a file from your device.<br />Image should be square, at least 1:1.</p>
                    <button className={styles.uploadButton} onClick={handleButtonClick}>
                        UPLOAD YOUR AVATAR
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <CustomButtonOther onClick={handleSaveClick}>Save Changes</CustomButtonOther>
        </div>
    );
};

export default UploadAvatar;

