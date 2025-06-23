import app from "./app";
import prisma from "./db/db";
import { env } from "./config/config";

const port = Number(env.PORT)

prisma
  .$connect()
  .then(() =>
    app.listen(port, () => console.log(`Server is running at port:- ${port}`))
  )
  .catch((err) => {
    console.log(`ERROR: Datatbase connection failed due to ${err}`);
    process.exit(1);
  });
