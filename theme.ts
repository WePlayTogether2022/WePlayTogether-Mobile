import { extendTheme } from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#ffeae5",
      100: "#ffd9d0",
      200: "#ffc8ba",
      300: "#ffb8a4",
      400: "#ffa68e",
      500: "#ff9578",
      600: "#ff8563",
      700: "#ff774d",
      800: "#ff6637",
      900: "#ff5722",
    },
    secondary: {
      50: "#ebf4fa",
      100: "#d2e5f3",
      200: "#b7d4eb",
      300: "#a0c5e4",
      400: "#89b7dc",
      500: "#74a8d5",
      600: "#609bce",
      700: "#4d8dc6",
      800: "#3b7fbf",
      900: "#2b74b8",
    },
  },
  components: {
    Input: {
      baseStyle: {
        _focus: {
          borderColor: "primary.50",
          backgroundColor: "white",
        },
        _hover: {
          borderColor: "primary.500",
        },
        _disabled: {
          borderColor: "gray.300",
          backgroundColor: "gray.100",
        },
        _invalid: {
          borderColor: "red.500",
        },
      },
    },
  },
});

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
