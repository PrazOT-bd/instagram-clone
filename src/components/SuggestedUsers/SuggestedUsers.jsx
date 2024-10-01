import { Box, Flex, Text, VStack, Link } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
// import { Link } from "react-router-dom"

const SuggestedUsers = () => {
  return <>
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />

        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
            <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>Suggested for you</Text>
            <Text fontSize={12} fontWeight={"bold"} color={"blue.500"} cursor={"pointer"}>See All</Text>
        </Flex>

        <SuggestedUser name='Dan Abramov' followers={1345} avatar='https://bit.ly/dan-abramov' />
        <SuggestedUser name='Ryan Florence' followers={567} avatar='https://bit.ly/ryan-florence' />
        <SuggestedUser name='Christian Nwamba' followers={876} avatar='https://bit.ly/code-beast'/>

        <Box
        fontSize={12}
        color={"gray.500"}
        mt={5}
        >
            © 2024 Built By {" "}
            <Link href="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" target={"_blank"} color={"blue.500"} fontWeight={"bold"}>Praise</Link>
        </Box>

        {/* <Flex alignItems={"center"} gap={4}>
            <img src="XXXXXXXXXXXXXXXXXXXXXXXXXX" alt="user" className="h-12 w-12 rounded-full object-cover" />
            <Flex flexDir={"column"}>
                <h3 className="font-bold text-sm">username</h3>
                <p className="text-sm text-gray-500">Followed by someone + more</p>
            </Flex>
            <a href="#">Follow</a>
        </Flex> */}
    

    </VStack>
  
  
  </>
}

export default SuggestedUsers
