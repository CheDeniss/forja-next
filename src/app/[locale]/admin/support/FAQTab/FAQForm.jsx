import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import {addNewFAQ, updateFAQ} from "@/api/AdminServices/faqService.js";

export default function FAQForm({ faq, onCancel, onSaved }) {
    const [formData, setFormData] = useState(faq || { question: '', answer: '', order: 1 });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (faq?.id) {
            await updateFAQ(formData);
        } else {
            await addNewFAQ(formData);
        }
        onSaved();
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <TextField name="question" label="Питання" value={formData.question} onChange={handleChange} />
            <TextField name="answer" spellCheck={false} label="Відповідь" value={formData.answer} onChange={handleChange} multiline rows={4} />
            <TextField name="order" label="Порядок" type="number" value={formData.order} onChange={handleChange} />

            <Box display="flex" gap={2}>
                <Button variant="contained" onClick={handleSubmit}>Зберегти</Button>
                <Button variant="outlined" onClick={onCancel}>Скасувати</Button>
            </Box>
        </Box>
    );
}
