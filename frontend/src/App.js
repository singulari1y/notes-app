import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.get("/notes").then((res) => {
  //     setNotes(res.data);
  //   });
  // });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/login/success", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err.response));
  }, []);

  // return (
  //   <ChakraBaseProvider theme={theme}>
  //     <Flex height={"-moz-max-content"} direction={"column"} p="1%">
  //       <Text fontSize={"4xl"} fontWeight={"semibold"}>
  //         Notes
  //       </Text>
  //       <Flex>
  //         <InputGroup m="1%">
  //           <InputLeftElement pointerEvents="none" children={<Search2Icon />} />
  //           <Input type="search" placeholder="Search..." />
  //           <InputRightAddon p={0}>
  //             <Button>Search</Button>
  //           </InputRightAddon>
  //         </InputGroup>
  //         <Button m="1%" onClick={onOpen}>
  //           Add Note
  //         </Button>
  //       </Flex>
  //     </Flex>

  //     {notes.map((item) => (
  //       <Note title={item.title} content={item.content} />
  //     ))}

  //     <Modal isOpen={isOpen} onClose={onClose}>
  //       <ModalOverlay />
  //       <ModalContent>
  //         <ModalHeader>New Note</ModalHeader>
  //         <ModalCloseButton />
  //         <ModalBody>
  //           <FormControl p={"2%"}>
  //             <FormLabel htmlFor="title">Title</FormLabel>
  //             <Input
  //               id="title"
  //               onChange={(e) => {
  //                 setTitle(e.target.value);
  //               }}
  //               value={title}
  //             />
  //           </FormControl>
  //           <FormControl p={"2%"}>
  //             <FormLabel htmlFor="content">Content</FormLabel>
  //             <Input
  //               id="content"
  //               onChange={(e) => {
  //                 setContent(e.target.value);
  //               }}
  //               value={content}
  //             />
  //           </FormControl>
  //         </ModalBody>

  //         <ModalFooter>
  //           <Button
  //             colorScheme="blue"
  //             mr={3}
  //             onClick={() => {
  //               axios.post("/notes", { title, content }).then((res) => setNotes((n) => [...notes, n]));
  //               setTitle("");
  //               setContent("");
  //               onClose();
  //             }}
  //           >
  //             Done
  //           </Button>
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal>
  //   </ChakraBaseProvider>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
