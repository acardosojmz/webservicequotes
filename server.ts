 
import { Application } from "./dependences.ts";

import routerQuotes from "./routes/quotes.ts";
import routerUsers from "./routes/users.ts";


import NotFound from "./middleware/notfound.ts";
import errorHandler from "./middleware/errorhandler.ts";

import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";



const env = Deno.env.toObject()

const PORT = env.PORT || 8000;
const HOST = env.HOST || '0.0.0.0';

const app = new Application();

app.use(errorHandler);
app.use(oakCors()); // Enable CORS for All Routes

//--- Quotes
app.use(routerQuotes.routes());
app.use(routerQuotes.allowedMethods());
//--- Users
app.use(routerUsers.routes());
app.use(routerUsers.allowedMethods());

app.use(NotFound);

//--- `(alt + }) 
console.log(`Server running on port ${PORT}`  );
app.listen(`${HOST}:${PORT}`);



