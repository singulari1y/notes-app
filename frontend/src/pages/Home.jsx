import {
  ChakraBaseProvider,
  Flex,
  extendTheme,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import axios from "axios";

const Home = (props) => {
  axios.defaults.baseURL = "http://localhost:3001";
  const user = props.user;
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          height: "100%",
        },
      }),
    },
  });

  useEffect(() => {
    axios
      .get(`/notes/${user.googleId}`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const matchStrings = (note, s) => {
    if (s.startsWith("title:")) {
      if (note.title.match(new RegExp(s.slice(6), "i"))) return true;
      else return false;
    } else if (s.startsWith("content:")) {
      if (note.content.match(new RegExp(s.slice(8), "i"))) return true;
      else return false;
    } else if (note.title.match(new RegExp(s, "i")) || note.content.match(new RegExp(s, "i"))) return true;
  };

  const { isOpen: isFirstOpen, onOpen: onFirstOpen, onClose: onFirstClose } = useDisclosure();
  const [notes, setNotes] = useState(user.notes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  return (
    <ChakraBaseProvider theme={theme}>
      <Flex p="1%" boxShadow={"0 2px 4px 0 rgba(0,0,0,.2)"} justifyContent={"space-between"} width={"100%"}>
        <Text fontSize={"4xl"} fontWeight={"semibold"}>
          Welcome, {user.userName}
        </Text>
        <Button size={"lg"}>Logout</Button>
      </Flex>
      <Flex width={"100%"} alignItems={"center"} justifyContent={"center"}>
        <Flex width={"70%"} marginTop={"2%"}>
          <InputGroup m="1%">
            <InputLeftElement pointerEvents="none" children={<Search2Icon />} />
            <Input type="search" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search} />
            <InputRightAddon p={0}>
              <Button
                onClick={() => {
                  if (searchMode) setSearch("");
                  setSearchMode(!searchMode);
                }}
              >
                {searchMode ? "Clear search" : "Search"}
              </Button>
            </InputRightAddon>
          </InputGroup>
          <Button m="1%" onClick={onFirstOpen}>
            Add Note
          </Button>
        </Flex>
      </Flex>

      <Flex width={"100%"} alignItems={"start"} justifyContent={"center"} height="100%">
        <Flex width={"100%"} alignItems={"start"} justifyContent={"space-evenly"} height={"100%"} flexFlow={"wrap"} alignContent={"flex-start"}>
          {!searchMode
            ? notes.map((item, i) => <Note title={item.title} content={item.content} key={i} />)
            : notes.filter((note) => matchStrings(note, search)).map((item, i) => <Note title={item.title} content={item.content} key={i} />)}
        </Flex>
      </Flex>

      <Modal isOpen={isFirstOpen} onClose={onFirstClose}>
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
                axios.post("/notes", { title: title, content: content, googleId: user.googleId }).then((res) => {
                  setNotes((n) => [...n, res.data]);
                  user.notes.push(res.data);
                });
                setTitle("");
                setContent("");
                onFirstClose();
              }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraBaseProvider>
  );
};

export default Home;
