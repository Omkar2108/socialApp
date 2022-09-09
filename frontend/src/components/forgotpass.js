import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      <Box maxW="md" maxH="md">
        <Stack>
          <FormControl className="">
            <FormLabel className="text-blue-500 mt-1">Username</FormLabel>
            <Input className="w-1/5" variant="outline" />
            {check && (
              <FormLabel className="text-blue-500 mt-1">Password</FormLabel>
            )}
            {check && (
              <InputGroup>
                <Input
                  className="w-1/5"
                  variant="outline"
                  type={show ? "text" : "password"}
                />
                <InputRightElement>
                  <Button size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
            <Flex width="100%">
              <Button
                className=" mt-2"
                variant="outline"
                colorScheme="blue"
                isLoading={false}
                loadingText="Loading"
              >
                {check ? "Set Password" : "Check User"}
              </Button>
              <Spacer />
              <Link className=" text-blue-500" to="/">
                <Button
                  variant="outline"
                  colorScheme="blue"
                  className="flex justify-end mt-2"
                >
                  Login
                </Button>
              </Link>
            </Flex>
          </FormControl>
        </Stack>
      </Box>
    </div>
  );
}

export default ForgotPassword;
