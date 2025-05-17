'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import ModalWrapper from '@/components/ui/Modal_components/ModalWrapper';
import ErrorModal from '@/components/ui/Modal_components/ErrorModal/ErrorModal.jsx';
import SuccessModal from '@/components/ui/Modal_components/SuccessModal/SuccessModal.jsx';
import UserLibraryAchieveModal
    from "@/components/ui/Modal_components/UserLibraryAchieveModal/UserLibraryAchieveModal.jsx";
import AllUsersAchievesModal
    from "@/components/ui/Modal_components/AllUsersAchievesModal/AllUsersAchievesModal.jsx";
import LoginModal from "@/components/ui/Modal_components/LoginModal/LoginModal.jsx";
import ReviewModal from "@/components/ui/Modal_components/ReviewModal/ReviewModal.jsx";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        open: false,
        modalType: null,
        modalProps: {},
    });

    const showModal = useCallback(({ modalType, modalProps = {} }) => {
        setModalState({ open: true, modalType, modalProps });
    }, []);

    const hideModal = useCallback(() => {
        setModalState({ open: false, modalType: null, modalProps: {} });
    }, []);

    const renderModalContent = () => {
        const { modalType, modalProps } = modalState;
        switch (modalType) {
            case 'error':
                return <ErrorModal {...modalProps} />;
            case 'success':
                return <SuccessModal {...modalProps} />;
            case 'user-library-achievements':
                return <UserLibraryAchieveModal {...modalProps} />;
            case 'user-all-achievements':
                return <AllUsersAchievesModal {...modalProps} />;
            case 'login':
                return <LoginModal onSuccess={modalProps?.onSuccess} />;
            case 'review':
                return <ReviewModal onClose={modalProps?.onClose} onSubmit={modalProps?.onSubmit} />;
            default:
                return null;
        }
    };

    return (
        <ModalContext.Provider value={{ ...modalState, showModal, hideModal }}>
            {children}
            <ModalWrapper open={modalState.open} onClose={hideModal}>
                {renderModalContent()}
            </ModalWrapper>
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
