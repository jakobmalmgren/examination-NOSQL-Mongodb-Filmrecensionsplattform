import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 4000;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("ansluten till mongoDB");
  } catch (error) {
    console.log("gick inte ansluta till mongoDB", error.message);
    process.exit(1);
  }
};

connectDb();

app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`servern är igång på http://localhost:${PORT}`);
});

// -------
// Lägg till en endpoint: GET /movies/ratings: Hämta en lista med alla filmer och deras genomsnittliga betyg.

// -------
// Använd JWT för autentisering och implementera roller: user och admin. Alla kan hämta filmer samt läsa/skriva rescensioner men endast admin kan lägga till, uppdatera eller ta bort filmer.

// -------
// Skapa backend till en webbapplikation för att hantera filmrecensioner. En användare kan registrera sig och väl inloggad så kan hen
// lämna rescensioner på filmer i databasen.

// -------

//kolla var ja ska göra mer populate...

//--------

//bifoga exempelanrop (använd till exempel: Postman) till alla endpoints
// (se länk under inlämning) för G!!!

//---------
//bifoga exempelanrop (använd till exempel: Postman) till alla endpoints
// för VG!!!
// Exempelanrop bifogas (Postman).
