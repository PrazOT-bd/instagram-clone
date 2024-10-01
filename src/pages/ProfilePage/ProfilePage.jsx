import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTabs from '../../components/Profile/ProfileTabs'
import ProfilePosts from '../../components/Profile/ProfilePosts'

const ProfilePage = () => {
  return <>
    <Container maxW="container.lg" py={5}>
        <Flex
        py={10}
        px={4}
        ml={10}
        flexDirection={"column"}
        w={"full"}
        mx={"auto"}
        pl={{base:4, md:10}}
        >
            <ProfileHeader />

        </Flex>

        <Flex
        px={{base:2, sm:4}}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
        >
            <ProfileTabs />
            <ProfilePosts />

        </Flex>



    </Container>
  
  
  
  </>
}

export default ProfilePage;
