'use client';

import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ImagesTab.module.scss';

const ImagesTab = ({ editMode, formData, setFormData }) => {
    const { logoUrl, images = [] } = formData;

    const handleLogoChange = (e) => {
        setFormData({ ...formData, logoUrl: e.target.value });
    };

    const handleAddImage = () => {
        setFormData({ ...formData, images: [...images, ''] });
    };

    const handleImageChange = (index, value) => {
        const updated = [...images];
        updated[index] = value;
        setFormData({ ...formData, images: updated });
    };

    const handleRemoveImage = (index) => {
        const updated = images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updated });
    };

    return (
        <Box className={styles.tabSection}>
            <Typography variant="h5" gutterBottom>
                Зображення гри
            </Typography>

            <TextField
                label="URL логотипу"
                name="logoUrl"
                fullWidth
                value={logoUrl}
                onChange={handleLogoChange}
                disabled={!editMode}
                sx={{ mb: 3 }}
            />

            <Typography variant="h6" gutterBottom>Галерея</Typography>

            {images.length === 0 && <Typography>Зображення відсутні.</Typography>}

            {images.map((url, index) => (
                <Box key={index} className={styles.imageRow}>
                    <TextField
                        label={`Зображення ${index + 1}`}
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        disabled={!editMode}
                        fullWidth
                    />
                    {editMode && (
                        <IconButton onClick={() => handleRemoveImage(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

            {editMode && (
                <Button variant="outlined" onClick={handleAddImage} sx={{ mt: 2 }}>
                    Додати зображення
                </Button>
            )}
        </Box>
    );
};

export default ImagesTab;
