import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Comment from '../Comment/Comment';
import PostFooter from '../FeedPosts/PostFooter';

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>

      <GridItem
        cursor={"pointer"}
        borderRadius={4} overflow={"hidden"} border={"1px solid"}
        borderColor={"WhiteAlpha.500"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          justifyContent={"center"}
          zIndex={1}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>

            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>

        </Flex>

        <Image src={img} alt='profile post' w={"full"} h={"full"} objectFit={"cover"} />

      </GridItem>


      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3x1", md: "5x1" }}
      >
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap="4" w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"WhiteAlpha.500"}
                flex={1.5}
              >
                <Image src={img} alt='profile post' />
              </Box>
              <Flex flex={1} flexDir={'column'} px={10} display={{ base: "none", md: "flex" }}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex alignItems={"center"} gap={4}>

                    <Avatar src='/profilepic.png' size={"sm"} name='Praise' />
                    <Text fontWeight={"bold"} fontSize={12}>
                      Praise_
                    </Text>
                  </Flex>

                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor="pointer" />
                  </Box>
                </Flex>

                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt={"2d ago"}
                    username={"Praise"}
                    profilePic={"/profilepic.png"}
                    text={"Dummy image"}
                  />

                  <Comment
                    createdAt={"12h ago"}
                    username={"Akan"}
                    profilePic={"/profilepic.png"}
                    text={"Nice pic"}
                  />

                  <Comment
                    createdAt={"3h ago"}
                    username={"Vic"}
                    profilePic={"/profilepic.png"}
                    text={"Great image"}
                  />


                </VStack>

                <Divider my={4} bg={"gray.8000"} />

                <PostFooter isProfilePage={true} />

              </Flex>

            </Flex>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
