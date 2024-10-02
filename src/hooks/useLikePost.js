import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);

    // Ensure post.likes is an array by providing a default empty array
    const likesArray = Array.isArray(post?.likes) ? post.likes : [];

    const [likes, setLikes] = useState(likesArray.length);
    const [isLiked, setIsLiked] = useState(likesArray.includes(authUser?.uid));
    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isUpdating) return;
        if (!authUser) return showToast("Error", "You must be logged in to like a post", "error");
        setIsUpdating(true);

        try {
            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });

            setIsLiked(!isLiked);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
