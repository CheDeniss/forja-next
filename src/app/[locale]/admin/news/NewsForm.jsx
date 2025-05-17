import React, { useState, useEffect } from 'react';
import {
    Box, TextField, Button, FormControlLabel, Checkbox,
    Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { createNewsArticle, updateNewsArticle } from '@/api/AdminServices/newsAdminService.js';
import { getAllUsers } from '@/api/AdminServices/userAdminService.js';
import { getAllGames } from '@/api/AdminServices/gamesAdminService.js'; // або твій шлях

export default function NewsForm({ article, onCancel, onSaved }) {
    const [formData, setFormData] = useState(article || {
        title: '',
        content: '',
        publicationDate: new Date().toISOString(),
        isPrioritized: false,
        imageUrl: '',
        authorId: '',
        productId: ''
    });

    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        if (!article) {
            (async () => {
                try {
                    const usersResponse = await getAllUsers();
                    setUsers(Object.values(usersResponse)); // 👈 тут ключ
                } catch (err) {
                    console.error('Failed to load users:', err);
                }

                try {
                    const gamesResponse = await getAllGames();
                    setGames(Object.values(gamesResponse)); // 👈 і тут
                } catch (err) {
                    console.error('Failed to load games:', err);
                }
            })();
        }
    }, [article]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        if (article?.id) {
            await updateNewsArticle(article.id, formData);
        } else {
            await createNewsArticle(formData);
        }
        onSaved();
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Заголовок" name="title" value={formData.title} onChange={handleChange} />
            <TextField label="Контент" name="content" value={formData.content} onChange={handleChange} multiline rows={6} />
            <TextField label="Дата публікації" name="publicationDate" type="datetime-local" value={formData.publicationDate.slice(0, 16)} onChange={handleChange} />
            <TextField label="URL зображення" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

            {article ? (
                <TextField label="Author ID" name="authorId" value={formData.authorId} onChange={handleChange} />
            ) : (
                <FormControl fullWidth>
                    <InputLabel id="author-select-label">Автор</InputLabel>
                    <Select
                        labelId="author-select-label"
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleChange}
                        label="Автор"
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.username || user.email || user.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {article ? (
                <TextField label="Product ID" name="productId" value={formData.productId} onChange={handleChange} />
            ) : (
                <FormControl fullWidth>
                    <InputLabel id="product-select-label">Гра</InputLabel>
                    <Select
                        labelId="product-select-label"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        label="Гра"
                    >
                        {games.map((game) => (
                            <MenuItem key={game.id} value={game.id}>
                                {game.title || game.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <FormControlLabel
                control={<Checkbox checked={formData.isPrioritized} onChange={handleChange} name="isPrioritized" />}
                label="Пріоритетна новина"
            />
            <Box display="flex" gap={2}>
                <Button variant="contained" onClick={handleSubmit}>Зберегти</Button>
                <Button variant="outlined" onClick={onCancel}>Скасувати</Button>
            </Box>
        </Box>
    );
}
