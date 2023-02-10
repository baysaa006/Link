import { extendTheme ,type ThemeConfig} from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";

Foundational style overrides
import borders from "./foundations/borders";

// Component style overrides
import Button from "./components/button";

const overrides = {
  styles,
  // Other foundational style overrides go here
  components: {
    // Other components go here
  },
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config })

export default theme;
