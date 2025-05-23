import React from 'react';
import styles from './getRating.module.scss';

export function getRatingLabel(positiveRating, negativeRating){
    const total = positiveRating + negativeRating;

    if (total === 0) {
        return <span className={styles.label}>NO REVIEWS</span>;
    }

    const percent = (positiveRating / total) * 100;
    let label = '';
    let color = '';

    if (percent >= 95) {
        label = 'OVERWHELMING';
        color = '#00ff99';
    } else if (percent >= 80) {
        label = 'GREAT';
        color = '#00FFD1';
    } else if (percent >= 70) {
        label = 'POSITIVE';
        color = '#00E0FF';
    } else if (percent >= 40) {
        label = 'MIXED';
        color = '#FFB800';
    } else if (percent >= 20) {
        label = 'NEGATIVE';
        color = '#FF6568';
    } else {
        label = 'AWFUL';
        color = '#FF2222';
    }

    return (
    <span className={styles.label}>
        <span style={{ color }}>{label}</span>{' '}
        <span>({total})</span>
    </span>
    );
}
