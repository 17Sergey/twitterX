import React from "react";
import { PostType } from "../../../utils/dummy";

type PostProps = {
    post: PostType;
};

export default function Post({ post }: PostProps) {
    return <div>{post.text}</div>;
}
