import { ChangeEvent, Dispatch, useRef } from "react";

export const useImageUploading = () => {
    const imgRef = useRef<HTMLInputElement>(null);

    const triggerImageChange = (imageRef: typeof imgRef) => {
        imageRef?.current?.click();
    };

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        setStateCallback: Dispatch<React.SetStateAction<string | null>>
    ) => {
        e.preventDefault();

        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setStateCallback(reader?.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return { imgRef, triggerImageChange, handleImageChange };
};
