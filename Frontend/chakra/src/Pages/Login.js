import {  Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Image, } from '@chakra-ui/react';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';

  export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setpass] = useState('')
  const {login, error, isLoading} = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
          await login(email, password)
  }

    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} >
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit}   >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  onChange={(e) => setEmail(e.target.value)} value={email} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password}   onChange={(e) => setpass(e.target.value)}  />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox colorScheme={'cyan'}>Remember me</Checkbox>
                <Link color={'cyan.500'}>Forgot password?</Link>
              </Stack>
              <Button colorScheme={'cyan'} variant={'solid'} type='submit'disabled={isLoading}>
                Sign in
              </Button>
              {error && <div className="error">{error}</div>}
            </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1} display={{base:'none' ,md:'none', lg:"block" }}>
          <Image
            alt={'Login Image'}
            objectFit={'fill'} 
            src={
              require("./image2.jpg")
            }
          />
        </Flex>
        
      </Stack>
    );
  }