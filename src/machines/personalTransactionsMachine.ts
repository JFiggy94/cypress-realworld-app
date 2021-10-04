import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { hostName } from "utils/baseUrlUtils";
import { backendPort } from "../utils/portUtils";

export const personalTransactionsMachine = dataMachine("personalTransactions").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(`http://${hostName}:${backendPort}/transactions`, {
        params: !isEmpty(payload) ? payload : undefined,
      });
      return resp.data;
    },
  },
});
