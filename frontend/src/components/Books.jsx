import { Card, Heading, Image, Text, VStack, Box, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Card key={id} p={4} maxW={'250px'} minH={'300px'}>
      <VStack>
        <Heading minH={'50px'} size={"md"}>
          {title} : ({year})
        </Heading>
        <Text>By: {author}</Text>
        <Box display={'flex'} minH={'150px'} alignItems={"center"}>
          <Image borderRadius={5} w={"200px"} maxH={"150px"} objectFit='cover' src={`http://localhost:8000/${image}`} />
        </Box>
        <Text>
          <span>Publisher: </span>
          {publisher}
        </Text>
        <Link to={`/books/${id}`}>
          <Button>Look More</Button>
        </Link>
      </VStack>
    </Card>
  );
}