import app from "./app";
import { prisma } from "./lib/prisma"
import { env } from "./config/config";

const port = Number(env.PORT ?? 3000)

prisma
  .$connect()
  .then(() =>
    app.listen(port, () => console.log(`Server is running at port:- ${port}`))
  )
  .catch((err: unknown) => {
    console.log(`ERROR: Datatbase connection failed due to ${err}`);
    process.exit(1);
  });
