import { Box, Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import { useState } from 'react';
import { InputRightElement } from '@chakra-ui/react';

const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
    };


    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box
                    onClick={handleLike}
                    cursor={"pointer"}
                    fontSize={18}
                >
                    {!liked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
                </Box>

                <Box cursor={"pointer"} fontSize={18}>
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

            <Flex alignItems={"center"}
                gap={2}
                justifyContent={"space-between"}
                w={"full"}
            >
                <InputGroup>
                    <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14} />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.500"}
                            fontWeight={600}
                            cursor={"pointer"}
                            _hover={{ bg: "white" }}
                            bg={"transparent"}
                        >
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </Flex>

        </Box>
    );
};

export default PostFooter;
