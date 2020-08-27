import { Flex, FlexProps, useColorMode } from '@chakra-ui/core'

const bgColor = { light: 'gray.50', dark: 'gray.900' }
const color = { light: 'black', dark: 'white' }

export const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      direction="column"
      alignItems="center"
      {...props}
    />
  )
}
