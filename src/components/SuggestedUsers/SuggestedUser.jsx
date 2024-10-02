import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";



const SuggestedUser = ({ user, setUser }) => {
    const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
    const authUser = useAuthStore((state) => state.user);

    const onFollowUser = async () => {
        await handleFollowUser();
        setUser({
            ...user,
            followers: isFollowing
                ? user.followers.filter((follower) => follower.uid !== authUser.uid)
                : [...user.followers, authUser],
        });
    };

    return <>
        <Flex alignItems={"center"} justifyContent={"space-between"} mt={4} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar src={user.profilePicURL} size={"md"} />
                <VStack spacing={2}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {user.fullName}
                    </Box>
                    <Box fontSize={12} color={"gray.500"}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>

            {authUser.uid !== user.uid && (
                <Button
                    fontSize={13}
                    fontWeight={"medium"}
                    color={"blue.500"}
                    bg={"transparent"}
                    _hover={{ color: "white" }}
                    p={0} h={"max-content"}
                    cursor={"pointer"}
                    onClick={onFollowUser}
                    isLoading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>



    </>
};

export default SuggestedUser;
