import { env } from "../../shared/environment/env";
import app from "./app";

const PORT = env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
