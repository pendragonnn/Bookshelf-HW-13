import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack>
      <Box shadow={'base'} p={5} borderRadius={10} mt={3}>
        {isLoading ? (
          <Skeleton height="400px" my="6" />
        ) : (
          <VStack>
            <Heading bg={'teal.400'} color={'white'} p={3} size={'md'} borderRadius={10}>Book Detail : {book.title}</Heading>
            <Flex >
              <Box maxWidth="400px">
                <Image
                  maxH={'400px'}
                  src={`http://localhost:8000/${book.image}`}
                  alt={book.title}
                />
              </Box>
              <VStack>
                <Box alignItems={'center'} ml="8" p={3} border={'1px'} borderColor={"gray.400"} minH={'300px'} minWidth={'400px'} bg={"gray.200"} borderRadius={5}>
                  <Text fontSize="md" fontWeight="semibold" color="gray.500">
                    Author: {book.author}
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.500">
                    Publisher: {book.publisher}
                  </Text>
                  <Text fontSize="md" fontWeight="semibold" color="gray.500" mb="4">
                    Release Year: {book.year} | Total Pages: {book.pages} pages
                  </Text>
                </Box>
                {localStorage.getItem('token') && (
                  <HStack mt={3}>
                    <Popover>
                      <PopoverTrigger>
                        <Button bg="orange.300">Delete</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this book?
                        </PopoverBody>
                        <Button onClick={handleDeleteBook} bg="orange.300" w={'25%'} ml={3} mb={5}>
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Link to={`/editbook/${id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </HStack>
                )}
              </VStack>
            </Flex>
          </VStack>

        )}

      </Box>
    </VStack>
  );
}
