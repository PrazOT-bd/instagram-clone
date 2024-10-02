import { Box, Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import { useState } from 'react';
import { InputRightElement } from '@chakra-ui/react';
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import { useRef } from 'react';
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post, username, isProfilePage }) => {
    const { isCommmenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState('');
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);
    const { handleLikePost, isLiked, likes } = useLikePost(post.id);

    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment('');
    }

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box
                    onClick={handleLikePost}
                    cursor={"pointer"}
                    fontSize={18}
                >
                    {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
                </Box>

                <Box cursor={"pointer"} fontSize={18}
                    onClick={() => commentRef.current.focus()}
                >
                    <CommentLogo />
                </Box>

            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
            {!isProfilePage && (
                <>
                    <Text fontSize={"sm"} fontWeight={700}>
                        {username} {" "}
                        <Text as={"span"} fontWeight={400}>
                            feeling good
                        </Text>
                    </Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                        view all 1000 comments
                    </Text>
                    <Text fontSize={"2xs"} color={"gray.500"}>
                        1 hour ago
                    </Text>
                </>
            )}

            {authUser && (
                <Flex alignItems={"center"}
                    gap={2}
                    justifyContent={"space-between"}
                    w={"full"}
                >
                    <InputGroup>
                        <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            ref={commentRef}
                        />
                        <InputRightElement>
                            <Button
                                fontSize={14}
                                color={"blue.500"}
                                fontWeight={600}
                                cursor={"pointer"}
                                _hover={{ bg: "white" }}
                                bg={"transparent"}
                                onClick={handleSubmitComment}
                                isLoading={isCommmenting}
                            >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                </Flex>
            )}

        </Box>
    );
};

export default PostFooter;
