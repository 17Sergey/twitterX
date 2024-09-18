import { Link } from "react-router-dom";

type CommentProps = {
    comment: {
        _id: string;
        text: string;
        user: {
            username: string;
            profileImg: string;
            fullName: string;
        };
    };
};

export default function Comment({ comment }: CommentProps) {
    return (
        <div className="mb-4">
            <div
                key={comment._id}
                className="flex gap-1 items-start"
            >
                <Link
                    to={`/profile/${comment.user?.username}`}
                    className="shrink-0 w-12 h-12"
                >
                    <img
                        src={comment.user?.profileImg || "/avatar-placeholder.png"}
                        alt="Avatar"
                        className="rounded-full w-10 h-10"
                    />
                </Link>
                <div>
                    <Link
                        to={`/profile/${comment.user?.username}`}
                        className="flex flex-col xs:flex-row xs:gap-2 items-baseline relative"
                    >
                        <p className="font-semibold">{comment.user?.fullName}</p>
                        <p className="font-normal text-sm opacity-30">@{comment.user?.username}</p>
                    </Link>
                    <p className="mt-2 hidden md:block mr-2">{comment.text}</p>
                </div>
            </div>
            <p className="mt-2 md:hidden mr-2">{comment.text}</p>
        </div>
    );
}
