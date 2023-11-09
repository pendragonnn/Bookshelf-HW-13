import { Box, Center, HStack, Stack, Flex, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
 


export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    
    <VStack maxWidth={'100vw'} p={5}>
      <Heading color={'white'} size={'lg'} bg={'teal.400'} align={'center'} p={3} borderRadius={5} mb={1}>
        Book List
      </Heading>
      <Box maxW={'full'}>
        <HStack spacing={0} gap={4} justify={'start'} wrap={'wrap'}>
          {books?.books?.map((book) => (
            <Books key={`${book.id} ${book.title}`} {...book} />
          ))}
        </HStack>
      </Box>
    </VStack>
  );
}
