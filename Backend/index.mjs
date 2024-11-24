// import AdminJS from 'adminjs'
// import AdminJSExpress from '@adminjs/express'
// import express from 'express'
// import mongoose from "mongoose";
// import * as AdminJSMongoose from '@adminjs/mongoose'

// import dotenv from "dotenv";
// dotenv.config()
// // const mongooseDb = await mongoose.connect('mongodb://localhost:27017/test')
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// // .then(() => console.log('MongoDB Connected'))
// // .catch((err) => console.error('MongoDB Connection Error:', err));

// const start = async () => {
//   const app = express()
//   console.log(MONGO_URI)
//   // process.exit(1)
//   const mongooseDb = await mongoose.connect(MONGO_URI).then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('MongoDB Connection Error:', err));
//   const admin = new AdminJS({
//     databases: [mongooseDb],
//   })
// // -------------------------------
// // AdminJS.registerAdapter(AdminJSMongoose);
// // ----------------------------------

//   const adminRouter = AdminJSExpress.buildRouter(admin)
//   app.use(admin.options.rootPath, adminRouter)
//   app.listen(PORT, () => {
//     console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
//   })
// }

// start()

import express from "express";
import AdminJS from "adminjs";
import mongoose from "mongoose";
import AdminJSExpress from "@adminjs/express";
import dotenv from "dotenv";
import * as AdminJSMongoose from "@adminjs/mongoose";

dotenv.config();
// Connect AdminJS with Mongoose
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize Express
const app = express();

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Example Mongoose Model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    icon: String,
    Coin_Name: String,
    Price: Number,
  })
);

// AdminJS Configuration
const adminJs = new AdminJS({
  resources: [
    {
      // schema
      resource: User,

      options: {
        // control field visibility
        listProperties: ["icon", "Coin_Name", "Price"],
        editProperties: ["Coin_Name"],

        properties: {
          // dropdown
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

  // changing default button text
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

// AdminJS Router
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Start the Server
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}${adminJs.options.rootPath}/resources/User`)
);
