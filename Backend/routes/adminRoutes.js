import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import User from "../models/user.js";

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        listProperties: ["icon", "Coin_Name", "Price"],
        editProperties: ["Coin_Name"],
        properties: {
          Coin_Name: {
            availableValues: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
              { value: "notSay", label: "Rather not say" },
            ],
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      buttons: {
        save: "Get Price",
        delete: "Remove",
      },
    },
  },
  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);

export { adminJs, adminRouter };
