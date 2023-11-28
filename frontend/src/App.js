import {
  ChakraBaseProvider,
  theme,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import axios from "axios";

export default function App() {
  axios.defaults.baseURL = "http://localhost:3001";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("/notes").then((res) => {
      setNotes(res.data);
    });
  });

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex height={"-moz-max-content"} direction={"column"} p="1%">
        <Text fontSize={"4xl"} fontWeight={"semibold"}>
          Notes
        </Text>
        <Flex>
          <InputGroup m="1%">
            <InputLeftElement pointerEvents="none" children={<Search2Icon />} />
            <Input type="search" placeholder="Search..." />
            <InputRightAddon p={0}>
              <Button>Search</Button>
            </InputRightAddon>
          </InputGroup>
          <Button m="1%" onClick={onOpen}>
            Add Note
          </Button>
        </Flex>
      </Flex>

      {notes.map((item) => (
        <Note title={item.title} content={item.content} />
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl p={"2%"}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />
            </FormControl>
            <FormControl p={"2%"}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Input
                id="content"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                console.log(title, content);
                // notes.push({ title, content });
                axios.post("/notes", { title, content }).then((res) => setNotes((n) => [...notes, n]));
                setTitle("");
                setContent("");
                onClose();
              }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraBaseProvider>
  );
}
