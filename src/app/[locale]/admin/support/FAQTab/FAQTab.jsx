'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FAQList from './FAQList.jsx';
import FAQForm from './FAQForm.jsx';
import { getAllFAQ } from '@/api/AdminServices/faqService.js';

export default function FAQTab() {
    const [faqs, setFaqs] = useState([]);
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const fetchFaqs = async () => {
        try {
            const data = await getAllFAQ();
            setFaqs(data);
        } catch (e) {
            console.error('Failed to fetch FAQs:', e);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleEdit = (faq) => {
        setSelectedFAQ(faq);
        setEditMode(true);
    };

    const handleAddNew = () => {
        setSelectedFAQ(null);
        setEditMode(true);
    };

    const handleSaved = () => {
        setEditMode(false);
        fetchFaqs();
    };

    return (
        <Box>
            {!editMode ? (
                <>
                    <h1>FAQ</h1>

                    <Button variant='contained' onClick={handleAddNew} sx={{mb: 2}}>
                        Додати запитання
                    </Button>
                    <FAQList faqs={faqs} onEdit={handleEdit} onRefresh={fetchFaqs}/>
                </>
            ) : (
                <FAQForm faq={selectedFAQ} onCancel={() => setEditMode(false)} onSaved={handleSaved} />
            )}
        </Box>
    );
}
