import genericRequestActions from "./genericRequest";
import getCurrentUserActions from "./getCurrentUser";

export default {
  ...genericRequestActions,
  ...getCurrentUserActions,
};
