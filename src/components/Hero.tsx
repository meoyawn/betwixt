import { Flex, Heading } from '@chakra-ui/core'

export const Hero = ({ title = 'with-chakra-ui' }: { title?: string }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading fontSize="10vw">{title}</Heading>
  </Flex>
)
