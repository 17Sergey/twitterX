import { useRef } from "react";

export const useModal = () => {
    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return { modalRef, openModal };
};
