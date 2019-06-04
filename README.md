# smarvelrenting
Technical challenge based on Marvel characters

## Get started

### 1. Clone the repository  
    git clone https://github.com/ParriauxMaxime/smarvelrenting.git 

### 2. Authentification  
  1. Get yours credential at the [Marvel Developper Portal](https://developer.marvel.com/)  
   
  2. Set your credentials
      * Open the `.env` file and add
        ```
        PRIVATE_API_KEY=<your-private-api-key>
        PUBLIC_API_KEY=<your-public-api-key>
        ```
      OR
      * Create a file `.credentials` in `smarvelrenting/server` and add 
        ```
        PRIVATE_API_KEY=<your-private-api-key>
        PUBLIC_API_KEY=<your-public-api-key>
        ```

### 3. Launch the docker  
    docker-compose up --build

### 4. Go to localhost:3000