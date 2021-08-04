import { Flex, Text, Box, Link } from '@chakra-ui/react';
import ThemeTogglebutton from '@components/ThemeToggleButton';
import NextLink from 'next/link';

function NavLink({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <Link px={2} {...props}>
        {children}
      </Link>
    </NextLink>
  );
}

export default function Navbar() {
  return (
    <Flex
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Text pl={3}>MDNEXT</Text>
      </Flex>
      <Box>
        <ThemeTogglebutton />
        <NavLink m={4} href="/">
          Home
        </NavLink>
        <NavLink m={4} href="/blog">
          Blog
        </NavLink>
      </Box>
    </Flex>
  );
}
