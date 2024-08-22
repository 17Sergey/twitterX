import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

function CreatePost() {
    const isPending = false;
    const isError = false;

    const [text, setText] = useState("");
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string | null>(null);
    const imgRef = useRef<HTMLInputElement>(null);

    const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setImg(reader?.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImg(null);
        if (imgRef.current) {
            imgRef.current.value = null;
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const data = {
        fullname: "John Doe",
        profileImg: "/avatars/boy1.png",
    };

    return (
        <div>
            <div className="flex items-center gap-4">
                <img
                    className="w-10 h-10"
                    src={data.profileImg || "/avatar-placeholder.png"}
                    alt="Avatar"
                />
                <div>
                    <p className="font-semibold text-[--theme-accent] text-base">{data.fullname}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="mt-4 textarea resize-none rounded-none w-full text-lg pl-0 border-none focus:outline-none focus:border-b"
                    placeholder="What's happening?"
                    value={text}
                    onChange={handleTextChange}
                />
                {img && (
                    <div className="w-1/2 mx-auto mb-6 relative pt-4">
                        <IoCloseSharp
                            className="absolute top-0 right-0 text-[--theme-accent] bg-neutral rounded-full w-5 h-5 cursor-pointer"
                            onClick={clearImage}
                        />
                        <img
                            className="mt-4"
                            src={img}
                            alt="Uploaded"
                        />
                    </div>
                )}
                <div className="pt-2 border-t border-t-neutral">
                    {isError && <p className="text-error mb-4">Something went wrong</p>}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CiImageOn
                                className="w-7 h-7 fill-primary cursor-pointer"
                                onClick={() => imgRef.current.click()}
                            />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                ref={imgRef}
                                onChange={handleImgChange}
                            />
                            <BsEmojiSmileFill className="w-6 h-7 fill-primary" />
                        </div>
                        <button className="btn btn-primary text-[--theme-accent] btn-sm rounded-full px-4">
                            {isPending ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
