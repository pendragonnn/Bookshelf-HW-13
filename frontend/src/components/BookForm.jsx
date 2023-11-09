import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  HStack,
  VStack,
  Heading,
  Flex,
  Spacer
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/home')
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/home')
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <VStack>
      <Heading bg={'teal'} color={'white'} p={2} size={'sm'} borderRadius={4}>
        Book Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box p={3} shadow='base' borderRadius={4}>
          <HStack>
            <FormControl p={2} shadow={'base'} borderRadius={4}>
              <FormLabel color='teal'>Year</FormLabel>
              <Input
                variant='flushed' focusBorderColor="teal.400"
                name="year"
                type="number"
                required
                defaultValue={bookData?.year}
              />
            </FormControl>
            <FormControl p={2} shadow={'base'} borderRadius={4}>
              <FormLabel color='teal'>Pages</FormLabel>
              <Input
                variant='flushed' focusBorderColor="teal.400"
                name="pages"
                type="number"
                required
                defaultValue={bookData?.pages}
              />
            </FormControl>
            
            <FormControl p={2} shadow={'base'} borderRadius={4}>
              <FormLabel color='teal'>Publisher</FormLabel>
              <Input variant='flushed' focusBorderColor="teal.400" name="publisher" required defaultValue={bookData?.publisher} />
            </FormControl>
          </HStack>

          <VStack mt={3} spacing={1}>
            <FormControl p={2} shadow={'base'} borderRadius={4}>
              <FormLabel color='teal'>Title</FormLabel>
              <Input variant='flushed' focusBorderColor="teal.400" name="title" required defaultValue={bookData?.title} />
            </FormControl>

            <FormControl p={2} shadow={'base'} borderRadius={4}>
              <FormLabel color='teal'>Author</FormLabel>
              <Input variant='flushed' focusBorderColor="teal.400" name="author" required defaultValue={bookData?.author} />
            </FormControl>
            
            {selectedImage && (
              <Image maxH={'300px'} src={selectedImage} alt="Selected Image" />
            )}
            {!bookData?.image && (
              <FormControl borderRadius={4}>
                <FormLabel color='teal'>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
            )}
          </VStack>
          <Flex mt={2} >
            <Spacer />
            <Button type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
          </Flex>
        </Box>
      </form>
    </VStack>
  );
}
