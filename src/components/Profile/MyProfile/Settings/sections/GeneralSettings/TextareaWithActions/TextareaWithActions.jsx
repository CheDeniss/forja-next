
import React, { useState } from 'react';
import styles from './TextareaWithActions.module.scss';
import CustomButtonOther from '@/components/ui/CustomButtonOther/CustomButtonOther.jsx';

const TextareaWithActions = ({user, onClick}) => {
    const [text, setText] = useState(user.selfDescription);
    const maxLength = 500;

    const handleConfirm = () => {
        console.log('Confirmed:', text);
    };

    const handleRemove = () => {
        setText('');
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.textareaWrapper}>
                    <textarea
                        className={styles.textarea}
                        placeholder="write about yourself"
                        spellCheck={"false"}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={maxLength}
                    />
                </div>
                    <span className={styles.charCount}>
                        {text.length}/{maxLength}
                    </span>
                {/*<div className={styles.actions}>*/}
                {/*    <CustomButtonOther onClick={handleConfirm}>Confirm</CustomButtonOther>*/}
                {/*    <CustomButtonOther onClick={handleRemove}>Remove</CustomButtonOther>*/}
                {/*</div>*/}
            </div>
            <CustomButtonOther onClick={() => onClick(text)}>Save Changes</CustomButtonOther>
        </div>
    );
};

export default TextareaWithActions;
