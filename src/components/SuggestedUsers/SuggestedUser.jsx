import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";


const SuggestedUser = ({followers, name, avatar}) => {
    const [isFollowed, setIsFollowed] = useState(false);
  return <>
    <Flex alignItems={"center"} justifyContent={"space-between"} mt={4} w={"full"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={avatar} size={"md"} />
            <VStack spacing={2}>
                <Box fontSize={12} fontWeight={"bold"}>
                    {name}
                </Box>
                <Box fontSize={12} color={"gray.500"}>
                    {followers} followers
                </Box>
            </VStack>
        </Flex>
        
        <Button
        fontSize={13}
        fontWeight={"medium"}
        color={"blue.500"}
        bg={"transparent"}
        _hover={{color: "white"}}
        p={0} h={"max-content"}
        cursor={"pointer"}
        onClick={() => setIsFollowed(!isFollowed)}
        >
            {isFollowed ? "Unfollow" : "Follow" }
        </Button>
    </Flex>
  
  
  
  </>
};

export default SuggestedUser;
