import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { hostName } from "utils/baseUrlUtils";
import { backendPort } from "../utils/portUtils";

export const notificationsMachine = dataMachine("notifications").withConfig({
  services: {
    fetchData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.get(`http://${hostName}:${backendPort}/notifications`, {
        params: !isEmpty(payload) && event.type === "FETCH" ? payload : undefined,
      });
      return resp.data;
    },
    updateData: async (ctx, event: any) => {
      const payload = omit("type", event);
      const resp = await httpClient.patch(
        `http://${hostName}:${backendPort}/notifications/${payload.id}`,
        payload
      );
      return resp.data;
    },
  },
});
