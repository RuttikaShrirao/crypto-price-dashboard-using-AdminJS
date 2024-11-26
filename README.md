# crypto-price-dashboard-using-AdminJS 

This project is a cryptocurrency dashboard built using the **AdminJS framework**, with **Express.js** on the backend and use **MongoDB** to store data. The application provides an interface for managing and interacting with cryptocurrency data.  


## Features

1. **View Coin Data**  
   - Displays a table of the cryptocurrency names and their prices.  
   - Data is fetched in real-time from the [CoinGecko API](https://www.coingecko.com/en/api).  

2. **Select and View Coin Price**  
   - Users can select a specific coin to view its price.  

3. **Update and Delete Coins**  
   - Users can update the details of a coin (e.g., name or price).  
   - Users can delete unwanted coins from the table.  

4. **Filter Coin Data**  
   - Users can filter the data to find specific coins or view data based on criteria such as name or price range.  


  

## Installation and Setup



### Prerequisites  
- Node.js and npm installed on your machine.  
- MongoDB database running.  
- get your API key from [CoinGecko](https://www.coingecko.com/en/api).  

### Steps  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/RuttikaShrirao/crypto-price-dashboard-using-AdminJS.git  
 
    ```

2. Install dependancies from package.json or from AdminJS documentation [AdminJS](https://docs.adminjs.co/installation/getting-started).    

3. As of version 7, AdminJS only **supports ESM** and will **no longer work with CommonJS syntax**. **setting up your node_modules folder**:
     ```bash
   Go To: 
   -  node_modules folder
   - adminjs folder 
   - lib folder 
   - locale folder
   - index.js file  

**replace all 'with' to 'assert' in  index.js file**


Example . import deLocale from './de/translation.json' **assert**  { type: 'json' }
    



4. Start the development server:
    ```bash
    node index.mjs
    ```

5. Open your browser and visit `http://localhost:5000/admin/resources/Token` to see the dashboard.

Happy coding! 😊


## Contact
Email: ruttikashrirao@gmail.com

Linkedin: https://www.linkedin.com/in/ruttikashrirao/