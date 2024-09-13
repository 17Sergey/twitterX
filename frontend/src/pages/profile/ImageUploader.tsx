import { ChangeEvent, Dispatch, FormEvent, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

export default function ProfileImage({
    isMyProfile,
    userImg,
}: {
    isMyProfile: boolean;
    userImg: string;
}) {
    const [profileImg, setProfileImg] = useState<string | null>(null);
    const profileImgRef = useRef<HTMLInputElement>(null);

    const triggerImageChange = (imageRef: typeof profileImgRef) => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        setStateCallback: Dispatch<React.SetStateAction<string | null>>
    ) => {
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <img
                className="w-32 h-32 object-cover rounded-full"
                src={profileImg || userImg || "/avatar-placeholder.png"}
            />
            {isMyProfile && (
                <form onSubmit={handleSubmit}>
                    <button
                        className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all btn btn-sm btn-circle btn-primary absolute top-1 right-1"
                        onClick={() => triggerImageChange(profileImgRef)}
                    >
                        <MdEdit className="w-4 h-4 fill-[--theme-accent]" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            ref={profileImgRef}
                            onChange={(e) => handleImageChange(e, setProfileImg)}
                        />
                    </button>
                </form>
            )}
        </>
    );
}
