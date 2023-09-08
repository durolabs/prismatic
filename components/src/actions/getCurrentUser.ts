import { action } from "@prismatic-io/spectral";
import { createLinearClient } from "../client";
import { connectionInput } from "../inputs";
import { gql } from "graphql-request";

const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Get information about the currently authenticated user",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = createLinearClient(params.connection);
    const query = gql`
      {
        viewer {
          id
          name
          email
        }
      }
    `;
    const data = await client.request(query);
    return { data };
  },
});

export default {
  getCurrentUser,
};
