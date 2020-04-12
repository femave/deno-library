import {
  writeFileStr,
  readFileStr
} from "https://deno.land/std/fs/mod.ts";


const args = Deno.args;
const repoTitle = args[0];
const repoLink = args[1];
const readme = await readFileStr("./README.md");


const conatenedString = readme.concat(`\n[${repoTitle}](${repoLink})\n- Url to import or install: ${repoLink}`)



await writeFileStr("./README.md", conatenedString);
const readFile = await readFileStr("./readme.md");




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