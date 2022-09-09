import {
  Alert,
  AlertIcon,
  AlertTitle,
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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, login } from "../redux/reducers/auth";

function Login() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigator = useNavigate();
  const { isSuccess, isLoading, msg, isError, auth, username } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth({auth, username}));
    if(isSuccess){
      navigator('/home');
    }
  }, [isSuccess ]);

  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <Box maxW="md" maxH="md">
          <Stack>
            <FormControl className="">
              <FormLabel className="text-blue-500 mt-1">Username</FormLabel>
              <Input
                className="w-1/5"
                variant="outline"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <FormLabel className="text-blue-500 mt-1">Password</FormLabel>
              <InputGroup>
                <Input
                  className="w-1/5"
                  variant="outline"
                  type={show ? "text" : "password"}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <InputRightElement>
                  <Button size="sm" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Link
                className="float-right text-sm m-1 text-blue-500"
                to="/forgotpassword"
              >
                Forgot Password?
              </Link>
              <br />
              <Flex width="100%">
                <Button
                  className=" mt-2"
                  variant="outline"
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Loading"
                  onClick={() => dispatch(login(user))}
                >
                  Login
                </Button>
                <Spacer />
                <Link className=" text-blue-500" to="/register">
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    className="flex justify-end mt-2"
                  >
                    Register
                  </Button>
                </Link>
              </Flex>
            </FormControl>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default Login;
