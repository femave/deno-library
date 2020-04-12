import {
    writeFileStr,
    readFileStr
  } from "https://deno.land/std/fs/mod.ts";


export interface GithubRepo {
    title: string, 
    link: string, 
    mainTsLink: string, 
    author: string, 
    githubLink: string}

export default async function createNewReadme(...args: string[]): Promise<void> {
    const repoTitle = args[0];
    const repoLink = args[1];
    const repoMainTs = args[2];
    const readme = await readFileStr("./README.md");
    let mainTsLink = '';
    
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
}