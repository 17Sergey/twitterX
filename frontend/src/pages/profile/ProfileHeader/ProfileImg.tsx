import { Dispatch } from "react";
import { MdEdit } from "react-icons/md";
import { useImageUploading } from "../../../hooks/useImageUploading";

type ProfileImgProps = {
    uploadedImg: string | null | undefined;
    setUploadedImg: Dispatch<React.SetStateAction<string | null>>;
    isMyProfile: boolean;
    userImg: string | null | undefined;
};

export default function ProfileImg({
    isMyProfile,
    userImg,
    uploadedImg,
    setUploadedImg,
}: ProfileImgProps) {
    const { imgRef, triggerImageChange, handleImageChange } = useImageUploading();
    return (
        <div className="relative group w-fit">
            <img
                className="w-32 h-32 object-cover rounded-full bg-neutral"
                src={uploadedImg || userImg || "/avatar-placeholder.png"}
                alt="Profile"
            />
            {isMyProfile && (
                <div
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all btn btn-sm btn-circle btn-primary absolute top-1 right-1"
                    onClick={() => triggerImageChange(imgRef)}
                >
                    <MdEdit className="w-4 h-4 fill-[--theme-accent]" />
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={imgRef}
                        onChange={(e) => handleImageChange(e, setUploadedImg)}
                    />
                </div>
            )}
        </div>
    );
}
