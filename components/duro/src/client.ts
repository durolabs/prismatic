import { Connection } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";

export const createDuroClient = (connection: Connection) => {
  const apiKey = connection.fields.username as string;
  const url = connection.fields.duroEnvironment as string;
  return new GraphQLClient(url, {
    headers: { apiToken: apiKey },
  });
}
