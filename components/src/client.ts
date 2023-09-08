import { Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";

export const createLinearClient = (connection: Connection) =>
  new GraphQLClient("https://api.linear.app/graphql", {
    headers: { authorization: `Bearer ${connection.token?.access_token}` },
  });
