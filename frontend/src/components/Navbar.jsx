import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Heading
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Link to="/home">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" color={'white'} fontWeight="bold">
            Bookshelf
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme='teal' variant={'solid'}>
            Login
          </Button>
        ) : (
          <Button
            bg='transparent'
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/")
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate("/home");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <Heading align={'center'} size={'md'} bg={'teal.400'} color={'white'} w={'50%'} p={2} borderRadius={5}>
                Login
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    variant={'flushed'}
                    focusBorderColor={'teal.400'}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    variant={'flushed'}
                    focusBorderColor={'teal.400'}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" bg={'teal'} color={'white'} mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button>
                  Register
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
