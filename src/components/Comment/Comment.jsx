import { Avatar, Flex, Text } from "@chakra-ui/react"

const Comment = ({ createdAt, username, profilePic, text }) => {
    return <>
        <Flex gap={4}>
            <Avatar src={profilePic} name={username} size={"sm"} />
            <Flex flexDirection={"column"}>
                <Flex gap={2}>
                    <Text fontWeight={"bold"} fontSize={12}>{username}</Text>
                    <Text fontSize={14}>{text}</Text>
                </Flex>
                <Flex>
                    <Text fontSize={12} color={"gray.light"}>{createdAt}</Text>
                </Flex>

            </Flex>

        </Flex>



    </>
}

export default Comment
