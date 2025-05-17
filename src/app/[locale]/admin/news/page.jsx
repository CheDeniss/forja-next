'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Tabs, Tab } from '@mui/material';
import NewsList from './NewsList.jsx';
import NewsForm from './NewsForm.jsx';
import {getAllNews} from "@/api/ServerServices/serverFetchServices.js";
import styles from './News.module.scss'

export default function NewsTab() {
    const [news, setNews] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const fetchNews = async () => {
        try {
            const res = await getAllNews(1, 9999);

            const paginatedResult = res?.paginatedResult?.items || [];
            const prioritizedNews = res?.prioritizedNewsArticles || [];

            const existingIds = new Set(paginatedResult.map(item => item.id));
            const uniquePrioritized = prioritizedNews.filter(p => !existingIds.has(p.id));

            const merged = [...uniquePrioritized, ...paginatedResult];

            setNews(merged);
        } catch (err) {
            console.error('Failed to fetch news:', err);
        }
    };


    useEffect(() => {
        fetchNews();
    }, []);

    const handleEdit = (item) => {
        setSelectedArticle(item);
        setEditMode(true);
    };

    const handleAddNew = () => {
        setSelectedArticle(null);
        setEditMode(true);
    };

    const handleSaved = () => {
        setEditMode(false);
        fetchNews();
    };
    return (
        <Box className={styles.newsWrapper}>
            <h1>Новини</h1>

            {!editMode && (
                <>
                    <Button variant="contained" onClick={handleAddNew} sx={{mb: 2}}>Створити новину</Button>
                    <NewsList news={news} onEdit={handleEdit} onRefresh={fetchNews}/>
                </>
            )}

            {(editMode) && (
                <NewsForm article={selectedArticle} onCancel={() => setEditMode(false)} onSaved={handleSaved}/>
            )}
        </Box>
    );
}
