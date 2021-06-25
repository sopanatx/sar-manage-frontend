import { theme, extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    ...theme.fonts,
    /** Example */
    heading: `"Kanit", sans-serif`,
    body: `"Sarabun", sans-serif`,
  },
  colors: {
    ...theme.colors,
    /** Example */
    teal: {
      ...theme.colors.teal,
      700: "#005661",
      500: "#00838e",
      300: "#4fb3be",
    },
  },
  secondary: {
    background: "#FBF7EF",
    link: "#4A5568",
    card: "#FBF7EF",
    inputHelper: "#CBD5E0",
  },
  components: {
    /** Example */
    // Button: {
    //   baseStyle: {
    //     borderRadius: 24,
    //   },
    // },
  },
});

export default customTheme;
