# aws_back

## Task 4-----------------------------------

**FE LINK**:

- Web App Domain: d1pamqutpae0js.cloudfront.net

**FrontEnd PR**:

- https://github.com/mad1982max/shop-react-redux-cloudfront/pull/3

**BackEnd END POINTS**  
GET - https://ui834rx8q3.execute-api.us-east-1.amazonaws.com/products/{productId}  
GET - https://ui834rx8q3.execute-api.us-east-1.amazonaws.com/products  
POST - https://ui834rx8q3.execute-api.us-east-1.amazonaws.com/products

**Schemas**

- Product:

```js
{
  title: string,
  description: string,
  price: number,
}
```

**Preliminary work**:

- Rename file **db-credentials_empty.yml** to **db-credentials.yml**
- Fill it with your credentials for DB

**DONE**

- **Main** ALL

  - Task 4.1 :

    - created a database instance in _RDS_
    - created 2 tables (_products_, _stocks_) with _DBeaver_
    - added _SQL script_: **helpers/db/sql_fillByData.js** and fill tables with data

  - Task 4.2:

    - Extended serverless.yml file with credentials to database instance and passed it to lambda’s environment
    - Integrated _GET/products_ lambda to return a list of products from the database (joined stocks and products tables). Product instance on FE side is joined model of product and stock by productId.
    - environment variables stored to _.gitignore_
    - Integrated _GET/products/{productId}_ lambda to return a product from the database

  - Task 4.3:

    - Implemented POST/products lambda and implemented its logic (created a new item in a products table)

  - Task 4.4:

    - Committed all work to separate branches (e.g. task-4 from master) in BE (backend) and if in FE (frontend) repositories.
    - Created a pull request to the master branch.

- **Additional** 2 from 4

  - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
  - All lambdas do console.log for each incoming requests and their arguments

## Task 3-----------------------------------

# 1. Main: _all done_

- **Product-service** and **YAML** added
- **getProductsList and getProductsById** - added and returned correct response
- **Frontend** application is integrated with product service (**https://d1pamqutpae0js.cloudfront.net**)

# 2. Additional:

- Async/await is used in lambda functions
- ES6 modules are used for product-service implementation
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- Main error scenarious are handled by API ("Product not found" error).
