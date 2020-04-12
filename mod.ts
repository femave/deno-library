import createNewReadme from "./create-new-readme.ts";
import updateRepo from "./update-repo.ts";


const args = Deno.args;

console.log('here')   
await createNewReadme(...args);
updateRepo();


// README structure if its lost.
const readmeStructure = 
`# Deno .TS from github

## Install

isntall command 
\`deno install cdenon --allow-write --allow-read --allow-run https://raw.githubusercontent.com/femave/live-server-reload/master/mod.ts\`

## Usage

\`\`\`
Usage:
    denon [TITLE] [REPOPATH] [TSPATH]*

    * optional

OPTIONS:
    TITLE    ==> Title that apear on to list.
    REPOPATH ==> Patah of your repository, ex: https://github.com/femave/live-server-reload
    TSPATH*   ==> Main .ts or .js path. Automatically we search on mod.ts or mod.js to index.

IMPORTANT:
    The main .ts should be mod.ts, if not add the main ts to [TSPATH]
\`\`\`



## Deno TS Library index`;