import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Flex, Text, Button } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          height: "100%",
        },
      }),
    },
  });

  const login = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex height={"100%"} direction={"column"}>
        <Flex boxShadow={"0 2px 4px 0 rgba(0,0,0,.2)"} p="1%">
          <Text fontSize={"4xl"} fontWeight={"semibold"}>
            Notes
          </Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} flex={2}>
          <Button size={"lg"} onClick={login}>
            Sign in
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
