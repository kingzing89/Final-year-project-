import { Box, useRadio } from "@chakra-ui/react"

export function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label' bg="cyan.400"rounded='full' >
        <input {...input}  />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          rounded='full'
          boxShadow='md'
          _checked={{
            bg: 'gray.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={3}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  