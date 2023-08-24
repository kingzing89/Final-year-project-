import { Box,useRadio ,chakra,Image, Text,Input} from '@chakra-ui/react'

export function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'  >
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='0.5px'
          borderRadius='none'
          boxShadow={{md:'block',sm:"none"}}
         
          _checked={{
            bg: 'teal.300',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={3}
          py={3}
        >
         <Text fontStyle={'sm'} width="20" as='samp'> {props.children}</Text> 
        </Box>
      </Box>
    )
  }