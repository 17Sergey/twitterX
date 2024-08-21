import React, { ChangeEvent, FormEvent, useState } from "react";

export default function AddCommentForm() {
    const [text, setText] = useState("");
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const isPending = false;
    const isError = false;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="mt-8">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
                    <textarea
                        className="textarea border-2 border-neutral resize-none focus:outline-none w-full text-base"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={handleTextChange}
                    />
                    <button className="btn btn-primary text-[--theme-accent] btn-sm rounded-full px-4 self-end md:self-center">
                        {isPending ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "Comment"
                        )}
                    </button>
                </div>
                {isError && <p>An error occured</p>}
            </form>
        </div>
    );
}
