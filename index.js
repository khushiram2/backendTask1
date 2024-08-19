import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./databse/databaseConnection.js"
import authRoutes from "./routes/authRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"
import entryRouter from "./routes/entryRoutes.js"



dotenv.config()

await connectDB()
const app = express();
app.use(cors())
app.use(express.json())
app.get("/", (_, res) => res.send("working fine"))
app.use("/auth", authRoutes)
app.use("/entry", entryRouter)
app.use("/category", categoryRouter)



app.listen(process.env.PORT, () => console.log("app started on port " + process.env.PORT))
