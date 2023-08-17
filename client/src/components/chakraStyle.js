import { extendTheme } from "@chakra-ui/react";
export const CustomButtonStyle = {
  baseStyle: {
    background:
      "radial-gradient(circle, rgba(240, 230, 140, 1) 0%, rgba(187, 96, 33, 0.954) 100%)",
    borderRadius: "8px",
    color: "#13293d",
    cursor: "pointer",
    fontSize: "1.5em",
    letterSpacing: "0.21px",
    lineHeight: 1,
    maxWidth: "250px",
    padding: "16px 32px",
    textAlign: "center",
    transition: "background-color 0.15s linear",
    margin: ".5rem",
  },
};

export const customTheme = extendTheme({
  components: {
    Button: CustomButtonStyle,
    Button: {
      baseStyle: {
        "@media screen and (max-width: 30em)": {
          padding: "3px",
          margin: "0.1rem",
        },
      },
    },
  },
});
