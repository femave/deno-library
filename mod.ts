import {
  writeFileStr,
  readFileStr
} from "https://deno.land/std/fs/mod.ts";


const args = Deno.args;
const repoTitle = args[0];
let repoLink = args[1];
const repoMainTs = args[2];
const readme = await readFileStr("./README.md");

if (!repoTitle || !repoLink) {
    console.log("No title or link provided.");
    Deno.exit(1)
}

if (repoLink.includes('github')) {
    repoLink = repoLink.replace('github', 'raw.githubusercontent').concat('/master/mod.ts');

    if (await seeIfExists(repoLink) && !repoMainTs) {
        console.log(`We don't found your mod.ts please provide the name of your main ts. Instructions in the README.md`)
        Deno.exit(2)
    }
}

const githubRepo = {
    title: repoLink,
    link: repoLink,
    author: getAuthor(repoLink)
}

writeNewReadm(concatStrings(readme, githubRepo));

function getAuthor(url: string): string {
    return url.split('/')[3];
}

async function seeIfExists(url: string): Promise<boolean> {
    const html = await (await fetch(url)).text();
    const length = html.length;
    return html.includes('404: Not Found') || length < 25;
}

function concatStrings(mainString: string, {title, link, author}: {title: string, link: string, author: string}): string {
    return mainString.concat(`\n[${title}](${link})\n- Url to import or install: ${link}\n- Author: ${author}`);
}

async function writeNewReadm(newReadme: string): Promise<any> {
    await writeFileStr("./README.md", newReadme);
}


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