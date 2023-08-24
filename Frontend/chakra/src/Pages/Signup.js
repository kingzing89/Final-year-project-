import { Flex,Box,FormControl,FormLabel,Input,InputGroup,HStack,InputRightElement,Stack,Button,Heading,Text,useColorModeValue,Link,
  Select,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import {Link as rlink,Navigate,redirect ,useNavigate} from "react-router-dom"
  import { useSignup } from "../hooks/useSignup"
  

  export default function SignupCard() {
    const navigate=useNavigate()
    const [fname, setfName] = useState('')
    const [lname, setlName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [address1,setAddress]=useState('')
    const username=fname+lname
    const [showPassword, setShowPassword] = useState(false);
    const [province,setprovince]=useState("Sindh")
    const [city,setCity]=useState("Karachi")
    const sts={
      Sindh:['Karachi','Hyderabad'],
      Punjab:['Lahore','Islamabad'],
      KPK:['Peshawar']

  }
  const prs=[
    {province:"Sindh",value:"Karachi",label:"Karachi"},
    {province:"Sindh",value:"Hyderabad",label:"Hyderbad"},
    {province:"Punjab",value:"Lahore",label:"Lahore"},
    {province:"Punjab",value:"Islamabad",label:"Islambad"},
    {province:"Kpk",value:"Peshavar",label:"Peshawar"},
  ]
  const {signup, error, isLoading} = useSignup()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(username,email,password,phone,address1,province,city)
   
   
  }
  const globalRegex = new RegExp('[1-9]', 'g');
  const Error=globalRegex.test(fname)===true
  const Errors=globalRegex.test(lname)===true
 
  const stt=sts[province]
  /*let options=stt.map((stts)=>
  {
       return <option key={stts} value={stts}>{stts}</option> 
  })*/
  let foptions = prs.filter((o) => o.province === province )
  let opt=foptions.map((o)=>{
       return <option value={o.value}>{o.value}</option>
  })
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box  rounded={"lg"}  bg={useColorModeValue("white", "gray.700")}  boxShadow={"lg"}  p={8} >
            <Stack spacing={4}>
              
              <form className="signup" onSubmit={handleSubmit}>
              <HStack>
                <Box>
                  
                  <FormControl id="firstName" isRequired isInvalid={Error}>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text"  value={fname} onChange={(e)=>setfName(e.target.value)}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isInvalid={Errors}>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={lname} onChange={(e)=>setlName(e.target.value)}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPass(e.target.value)} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <HStack>
                <Box>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input type='tel' maxLength={12}value={phone} onChange={(e)=>setPhone(e.target.value)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="address1" isRequired>
                    <FormLabel>Addresss</FormLabel>
                    <Input type="text" value={address1} onChange={(e)=>setAddress(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
                <Box>
                  <FormControl id="province" isRequired>
                    <FormLabel>Province</FormLabel>
                    <Select  value={province} onChange={(e)=>setprovince(e.target.value)}>
                      <option value="Sindh">Sindh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Kpk">Kpk</option>
                    </Select>
                  </FormControl>
                </Box>
                <Box pl="50px">
                  <FormControl id="city" isRequired>
                    <FormLabel>city</FormLabel>
                    <Select value={city} onChange={(e)=>setCity(e.target.value)} >
                      {opt}
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  colorScheme={'cyan'}
                  type='submit'
                  disabled={isLoading}
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    color={"red.500"}
                    as={rlink}
                    to="../Login"
                    _hover={{ bg: "red.300" }}
                  >
                    Login
                  </Link>
                </Text>
                {error && <div className="error">{error}</div> }
         
              </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }