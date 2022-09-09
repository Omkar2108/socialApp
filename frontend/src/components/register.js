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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {checkAuth, register } from '../redux/reducers/auth';

function Register() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    username:'',
    password:'',
    email:''
  })
  const navigator = useNavigate();
  const {isSuccess, isLoading, msg, auth, username} = useSelector(state=>state.auth);
  useEffect(() => {
    dispatch(checkAuth({auth, username}));
    if(isSuccess){
      navigator('/home');
    }
  }, [isSuccess])
  
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center h-screen">
      <Box maxW="md" maxH="md">
        <Stack>
          <FormControl className="">
            <FormLabel className="text-blue-500 mt-1">Email</FormLabel>
            <Input className="w-1/5" variant="outline" onChange={(e)=>setUser({...user, email:e.target.value})}/>
            <FormLabel className="text-blue-500 mt-1">Username</FormLabel>
            <Input className="w-1/5" variant="outline" onChange={(e)=>setUser({...user, username:e.target.value})}/>
            <FormLabel className="text-blue-500 mt-1">Password</FormLabel>
            <InputGroup>
              <Input
                className="w-1/5"
                variant="outline"
                type={show ? "text" : "password"}
                onChange={(e)=>setUser({...user, password:e.target.value})}
              />
              <InputRightElement>
                <Button size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex width="100%">
              <Button
                className=" mt-2"
                variant="outline"
                colorScheme="blue"
                isLoading={false}
                loadingText="Loading"
                onClick={()=>dispatch(register(user))}
              >
                Register
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

export default Register;
