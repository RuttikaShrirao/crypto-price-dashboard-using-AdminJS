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
    Coin_Name: String,
    Price: Number,
  })
);

// Fetch coin list for dropdown
const fetchCoinList = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    return response.data.slice(0, 20).map((coin) => ({
      key: coin.id,
      value: coin.id,
      label: coin.name,
    }));
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return [];
  }
};

const coinOptions = await fetchCoinList();

// AdminJS Configuration
const adminJs = new AdminJS({
  resources: [
    {
      resource: Token,
      options: {
        // display properties
        listProperties: ["Coin_Name", "Price"],
        showProperties: ["Coin_Name", "Price"],
        editProperties: ["Coin_Name"],

        // actions: {
        //   GetJsonData: {
        //     actionType: "record",
        //     isAccessible: true,
        //     handler: (request, response, context) => {
        //       const { record, currentAdmin } = context
        //       console.log(context,"===context====")
        //       return {
        //         record: record.toJSON(currentAdmin),
        //         msg: 'Hello world',
        //       }
        //     },
        //   },
        // },

        actions: {
          new: {
            before: async (request) => {
              if (request.payload.Coin_Name) {
                try {
                  const coin = request.payload.Coin_Name;

                  // Fetch coin data from CoinGecko API
                  const apiResponse = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price`,
                    {
                      params: {
                        ids: coin,
                        vs_currencies: "inr",
                      },
                      headers: {
                        accept: "application/json",
                        "x-cg-demo-api-key": "CG-jQRa5k6aW4XV42LkU9HNynmL",
                      },
                    }
                  );

                  const coinData = apiResponse.data[coin].inr;
                  console.log(coinData, "bitcoin", "samiksha", coin);

                  if (coinData) {
                    // Add price and icon to request payload
                    request.payload = {
                      ...request.payload, // Spread existing payload
                      Price: coinData,
                    };
                  } else {
                    console.error(`No data found for coin: ${Coin_Name}`);
                  }
                } catch (error) {
                  console.error("Error fetching coin data:", error.message);
                }
              } else {
                console.warn("No Coin_Name provided in payload.");
              }

              return request;
            },
          },
        },

        properties: {
          Coin_Name: {
            availableValues: coinOptions,
          },
        },
      },
    },
  ],

  locale: {
    translations: {
      actions: {
        new: {
          buttons: {
            save: "Get Price",
          },
        },
        edit: {
          buttons: {
            save: "Update Price",
          },
        },
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
