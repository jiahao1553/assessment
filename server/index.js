const express = require("express");
const crypto = require("crypto");
const bodyParser = require('body-parser')
const axios = require("axios");
const mongoClient = require('mongodb').MongoClient
const { getRandomCoffeeImage, validateDrink, roundDecimal, generateRandomPrice, getTypeDescriptionByName, generateRandomAlphaNumeric } = require('./utility')

const app = express();
const url = 'mongodb://root:rootpassword@cafe_mongo:27017/admin?readPreference=primary';
const port = 9000;

app.use(async (req, res, next) => {
  try {
    res.locals.mongo = await mongoClient.connect(url, { useNewUrlParser: true })
  } catch (error) {
    res.locals.mongo = null;
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/drinks", async (req, res) => {
  const TYPE = req.query.type ? req.query.type.toLowerCase() : null;
  if (TYPE && TYPE !== "beer" && TYPE !== "coffee") return res.status(404).send(`"${TYPE}" is not supported.`);

  let OUTPUT = [];
  if (!TYPE || TYPE === "coffee") {
    const coffeeRes = await axios("https://api.sampleapis.com/coffee/hot");
    const outputPromises = await coffeeRes.data
      .filter((d) => validateDrink(d))
      .map(async (e) => {
        return {
          name: e.title,
          price: `$${roundDecimal(generateRandomPrice(8, 20), 0)}.99`,
          rating: roundDecimal(generateRandomPrice(1, 5), 3),
          description: e.description,
          image: await getRandomCoffeeImage(),
          id: crypto.randomUUID(),
        };
      });
    OUTPUT = OUTPUT.concat(await Promise.all(outputPromises));
  }

  if (!TYPE || TYPE === "beer") {
    const beerRes = await axios("https://api.sampleapis.com/beers/ale");
    const outputPromises = await beerRes.data
      .filter((d) => validateDrink(d))
      .map(async (e) => {
        return {
          name: e.name,
          price: e.price,
          rating: e.rating.average,
          description: getTypeDescriptionByName(e.name),
          image: e.image,
          id: crypto.randomUUID(),
        };
      });
    OUTPUT = OUTPUT.concat(await Promise.all(outputPromises));
  }

  res.status(200).send(OUTPUT.sort((m, n) => n.rating - m.rating));
});

app.get("/cafes", async (req, res) => {
  if (!req.query.location) {
    res.status(200).send([])
    return
  }
  try {
    const result = await res.locals.mongo.db("cafe").collection("cafes").find({ location: req.query.location }, { sort: { employees: -1 }, projection: { _id: 0, name: 1, description: 1, employees: 1, logo: 1, location: 1, id: 1 } }).toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get("/cafes/employees", async (req, res) => {
  try {
    const result = await res.locals.mongo.db("cafe").collection("employees").find({}, { sort: { days_worked: -1 }, projection: { _id: 0, name: 1, days_worked: 1, cafe: 1, id: 1 } }).toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post("/cafe", async (req, res) => {
  const newCafe = req.body;
  if (!newCafe.id) newCafe.id = crypto.randomUUID();
  try {
    const result = await res.locals.mongo.db("cafe").collection("cafes").insertOne(newCafe)
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post("/cafe/employee", async (req, res) => {
  const newEmployee = req.body;
  if (!newEmployee.name) {
    res.status(400).send("Employee name is required")
    return
  }
  try {
    const sameEmployee = await res.locals.mongo.db("cafe").collection("employees").findOne({ name: newEmployee.name }, { projection: { _id: 0, cafe: 1 } });
    if (!sameEmployee) {
      if (!newEmployee.id) newEmployee.id = `UI${generateRandomAlphaNumeric(7)}`;
      const result = await res.locals.mongo.db("cafe").collection("employees").insertOne(newEmployee)
      res.status(200).send(result);
      return
    }
    if (sameEmployee.cafe === newEmployee.cafe) {
      res.status(422).send('Employee record existed')
      return
    }
    if (sameEmployee.cafe !== newEmployee.cafe) {
      res.status(422).send('The employee is currently working other cafe')
      return
    }
  } catch (error) {
    res.status(500).send(JSON.stringify(error))
  }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
