'use client';

import React, { useState } from 'react';
import {
    uploadAchievementImage,
    uploadAvatar, uploadMatureContentImage, uploadMechanicImage,
    uploadNewsArticleImage, uploadProductImage,
    uploadProductLogo, uploadProfileHatVariantImage
} from "@/api/Admin_Services/filesAdminService.js";
import {useModal} from "@/context/ModalContext.jsx";
import {refreshToken} from "@/api/authService.js";

const ImageUploadForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { showModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const form = e.target;
        const endpoint = form.endpoint.value;
        const objectId = form.objectId.value;
        const alt = form.alt.value;
        const file = form.file.files[0];

        const formData = new FormData();
        if (endpoint === '/Files/product-image') {
            formData.append('ProductId', objectId);
        } else {
            formData.append('ObjectId', objectId);
        }
        formData.append('File', file);
        formData.append('ObjectSize', file.size);
        formData.append('ContentType', file.type);
        formData.append('FileName', file.name);
        formData.append('ImageAlt', alt);


        try {
            let result;
            switch (endpoint) {
                case '/Files/avatar':
                    result = await uploadAvatar(formData);
                    break;
                case '/Files/product-logo':
                    result = await uploadProductLogo(formData);
                    break;
                case '/Files/achievement-image':
                    result = await uploadAchievementImage(formData);
                    break;
                case '/Files/news-article':
                    result = await uploadNewsArticleImage(formData);
                    break;
                case '/Files/mature-content-image':
                    result = await uploadMatureContentImage(formData);
                    break;
                case '/Files/mechanic-image':
                    result = await uploadMechanicImage(formData);
                    break;
                case '/Files/product-image':
                    result = await uploadProductImage(formData);
                    break;
                case '/Files/profile-hat-variant':
                    result = await uploadProfileHatVariantImage(formData);
                    break;
                default:
                    throw new Error('Invalid endpoint');
            }

            setMessage(`✅ Success! Path: ${result}`);
            showModal({ modalType: 'success', modalProps: { message: 'Upload successful!' } });
        } catch (err) {
            setMessage(`❌ Error: ${err.message}`);
            showModal({ modalType: 'error', modalProps: { message: err.message } });
        }

    };

    return (
        <div>
            <h2>Upload Image</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="endpoint">Select upload method:</label>
                <select id="endpoint" name="endpoint">
                    <option value="/Files/avatar">Avatar</option>
                    <option value="/Files/product-logo">Product Logo</option>
                    <option value="/Files/achievement-image">Achievement Image</option>
                    <option value="/Files/news-article">News Article</option>
                    <option value="/Files/mature-content-image">Mature Content Image</option>
                    <option value="/Files/mechanic-image">Mechanic Image</option>
                    <option value="/Files/product-image">Product Image</option>
                    <option value="/Files/profile-hat-variant">Profile Hat Variant</option>
                </select>

                <br/><br/>

                <label htmlFor="objectId">Object ID:</label>
                <input type="text" id="objectId" name="objectId" required style={{width: "300px"}}/>

                <br/><br/>

                <label htmlFor="file">Choose image:</label>
                <input type="file" id="file" name="file" accept="image/*" required/>

                <br/><br/>

                <label htmlFor="alt">Choose ALT:</label>
                <input type="text" id="alt" name="alt" required style={{width: "300px"}}/>

                <br/><br/>

                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {message && <p>{message}</p>}

            {/* Додаткові кнопки для перевірки модалок */}
            <button onClick={() => showModal({modalType: 'success', modalProps: { message: 'Test success message' } })}>
                Show Success Modal
            </button>

            <button onClick={() => showModal({ modalType: 'error', modalProps: { message: 'Test error message' } })}>
                Show Error Modal
            </button>

            <button onClick={() => showModal({ modalType: 'login'})}>
                Show Login Modal
            </button>

            <button onClick={() => refreshToken()}>Refresh</button>
        </div>
    );
};

export default ImageUploadForm;
