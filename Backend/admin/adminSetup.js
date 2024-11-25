import AdminJS from "adminjs";
import * as AdminJSMongoose from "@adminjs/mongoose";
import User from "../models/user.js";

AdminJS.registerAdapter(AdminJSMongoose);

export const configureAdmin = () => {
  return new AdminJS({
    resources: [{ resource: User }],
    rootPath: "/admin",
  });
};
