import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

export const styles = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.700",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
