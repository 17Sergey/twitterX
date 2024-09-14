import { Dispatch } from "react";
import { MdEdit } from "react-icons/md";
import { useImageUploading } from "../../../hooks/useImageUploading";

type ProfileCoverImgProps = {
    uploadedImg: string | null;
    setUploadedImg: Dispatch<React.SetStateAction<string | null>>;
    isMyProfile: boolean;
    userImg: string | null | undefined;
};

export default function ProfileCoverImg({
    isMyProfile,
    userImg,
    uploadedImg,
    setUploadedImg,
}: ProfileCoverImgProps) {
    const { imgRef, triggerImageChange, handleImageChange } = useImageUploading();
    return (
        <div className="relative group">
            <img
                className="w-full h-64 object-cover"
                src={uploadedImg || userImg || "/cover.png"}
                alt="Cover"
            />
            {isMyProfile && (
                <div
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all btn btn-sm btn-circle btn-primary absolute top-2 right-2"
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
