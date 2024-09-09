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
        <div>
            <div
                key={comment._id}
                className="flex gap-4 items-start mt-8"
            >
                <Link
                    to={`/profile/${comment.user?.username}`}
                    className="shrink-0 w-12 h-12"
                >
                    <img
                        src={comment.user?.profileImg || "/avatar-placeholder.png"}
                        alt="Avatar"
                        className="rounded-full"
                    />
                </Link>
                <div>
                    <Link
                        to={`/profile/${comment.user?.username}`}
                        className="flex flex-wrap gap-2 items-baseline relative top-2 md:top-0"
                    >
                        <p className="font-semibold">{comment.user?.fullName}</p>
                        <p className="font-normal text-sm opacity-30">@{comment.user?.username}</p>
                    </Link>
                    <p className="mt-2 hidden md:block">{comment.text}</p>
                </div>
            </div>
            <p className="mt-2 md:hidden">
                {comment.text} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
                a amet consequuntur aliquid unde eaque corporis, quisquam exercitationem non nihil!
            </p>
        </div>
    );
}
