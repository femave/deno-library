// import createNewReadme from "./create-new-readme.ts";
// import updateRepo from "./update-repo.ts";
import { DEBUG } from "./config.ts";


const args = Deno.args;
  
await createNewReadme(...args);
updateRepo();


import {
    writeFileStr,
    readFileStr
  } from "https://deno.land/std/fs/mod.ts";
interface GithubRepo {
    title: string, 
    link: string, 
    mainTsLink: string, 
    author: string, 
    githubLink: string}

async function createNewReadme(...args: string[]): Promise<void> {
    const repoTitle = args[0];
    const repoLink = args[1];
    const repoMainTs = args[2];
    const readme = await readFileStr("./README.md");
    let mainTsLink = '';

    if (DEBUG) {
        console.log(readme)
    }
    
    if (!repoTitle || !repoLink) {
        console.log("No title or link provided.");
        Deno.exit(1)
    }
    
    if (repoLink.includes('github')) {
        mainTsLink = repoLink.replace('github', 'raw.githubusercontent').concat('/master/mod.ts');
    
        if (await seeIfExists(mainTsLink) && !repoMainTs) {
            console.log(`We don't found your mod.ts please provide the name of your main ts. Instructions in the README.md`)
            Deno.exit(2)
        }
    }
    
    const githubRepo = {
        title: repoTitle,
        link: repoLink,
        mainTsLink: mainTsLink,
        author: getAuthor(repoLink),
        githubLink: getGithubLink(repoLink)
    }

    if (DEBUG) {
        console.log(githubRepo)
    }
    
    writeNewReadm(concatStrings(readme, githubRepo));

    function getGithubLink(url: string): string {
        return url.split('/').splice(0, 4).join('/');
    }
    
    function getAuthor(url: string): string {
        return url.split('/')[3];
    }
    
    async function seeIfExists(url: string): Promise<boolean> {
        const html = await (await fetch(url)).text();
        const length = html.length;
        return html.includes('404: Not Found') || length < 25;
    }
    
    function concatStrings(mainString: string, {title, link, mainTsLink, author, githubLink}: GithubRepo): string {
        return mainString.concat(`\n[${title}](${link})\n- Url to import or install: ${mainTsLink}\n- Author: [${author}](${githubLink})\n---`);
    }
    
    async function writeNewReadm(newReadme: string): Promise<any> {
        await writeFileStr("./README.md", newReadme);
    }

    if (DEBUG) {
        console.log(readme)
    }
}




import { v4 } from "https://deno.land/std/uuid/mod.ts";

async function updateRepo() {
    const branchId = v4.generate();

    const forkRepo = ['git', 'clone', 'https://github.com/femave/deno-library.git', 'cd', 'deno-library', 'hub', 'fork'];
    const createBranch = ['git', 'branch', branchId];
    const checkoutBranch = ['git', 'checkout', branchId];
    const gitAdd = ['git', 'add', '.'];
    const gitCommit = ['git', 'commit', '-', 'm', '=', '"Added new repo to README.md"'];
    const gitPush = ['git', 'push', 'origin', branchId];
    const gitPr = ['git', 'request-pull', 'master', 'https://github.com/femave/deno-library.git', 'master'];
    const deleteDir = ['cd', '..', 'rm', '-rf', 'deno-library'];


    const p = Deno.run({
        args: [
            ...forkRepo,
            ...createBranch,
            ...checkoutBranch,
            ...gitAdd,
            ...gitCommit,
            ...gitPush,
            ...gitPr
        ],
        stdout: "piped",
        stderr: "piped"
    });

    const { code } = await p.status();
    console.log(code)
    Deno.exit(code);
}