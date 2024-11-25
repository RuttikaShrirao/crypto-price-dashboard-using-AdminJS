import express from "express";
import axios from "axios";
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

// Mongoose Model
const Token = mongoose.model(
  "Token",
  new mongoose.Schema({
    icon: String,
    Coin_Name: String,
    Price: Number,
  })
);

// dropdown option getting fron coingico
const fetchCoinList = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const coinList = response.data;
    // Transform the data into a format compatible with AdminJS availableValues
    return coinList.slice(0, 20).map((coin) => ({
      value: coin.id, // unique identifier
      label: coin.name, // display name in the dropdown
    }));
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return [];
  }
};
// coin list array assign --> coinOptions
const coinOptions = await fetchCoinList();

// AdminJS Configuration
const adminJs = new AdminJS({
  resources: [
    {
      // schema
      resource: Token,

      options: {
        // control field visibility
        listProperties: ["icon", "Coin_Name", "Price"],
        editProperties: ["Coin_Name"],

        properties: {
          // dropdown
          Coin_Name: {
            availableValues: coinOptions,
          },
        },
      },
    },
  ],

  // changing default button text
  locale: {
    translations: {
      actions: {
        new: {
          buttons: {
            save: "Get Price", // Change "Save" button text to "Get Price"
          },
        },
        edit: {
          buttons: {
            save: "Update Price", // Change "Save" text in edit form if needed
          },
        },
      },
    },
  },
  rootPath: "/admin",
});
console.log(adminJs.options)
// AdminJS Router
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Start the Server
app.listen(PORT, () =>
  console.log(
    `Server started on http://localhost:${PORT}${adminJs.options.rootPath}/resources/Token`
  )
);

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import { adminRouter } from "./routes/adminRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use("/admin", adminRouter);

// app.listen(PORT, () =>
//   console.log(`Server started at http://localhost:${PORT}/admin`)
// );
