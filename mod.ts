import { v4 } from "https://deno.land/std/uuid/mod.ts";
import createNewReadme from "./create-new-readme.ts";
import updateRepo from "./update-repo.ts";
import createRepo from "./create-repo.ts";

const args = Deno.args;  
const branchId = v4.generate();

await createRepo(branchId);
await createNewReadme(...args);
await updateRepo(branchId);
Deno.exit();
