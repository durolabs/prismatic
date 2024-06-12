import { dataSource, input } from "@prismatic-io/spectral";
import { createClient } from "./client";

const myConnectionField = input({
  label: "Connection",
  type: "connection",
  required: true,
});

const myInputField = input({
  label: "My Input",
  type: "string",
  required: true,
});

export const myDataSource = dataSource({
  display: {
    label: "My Data Source",
    description: "This is my data source",
  },
  perform: async (context, { connection, myInput }) => {
    const client = createClient(connection);
    return {
      result: await client.call(myInput),
    };
  },
  inputs: {
    connection: myConnectionField,
    myInput: myInputField,
  },
  dataSourceType: "string",
});

export default { myDataSource };
