import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "linear",
  public: false,
  display: {
    label: "Linear",
    description:
      "Manage issues, cycles, product roadmaps and more with Linear.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  connections,
});
