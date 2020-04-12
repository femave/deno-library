

async function updateRepo() {
    const forkRepo;
    const createBranch;
    const gitAdd = ['git', 'add', '.'];
    const gitCommit = ['git', 'commit', '-', 'm', '=', '"Added new repo to README.md"'];
    const gitPush;
    const gitPr;
    const deleteDir;


    const p = Deno.run({
        args: [
            ...gitAdd
        ],
        stdout: "piped",
        stderr: "piped"
    });

    const { code } = await p.status();
    console.log(code)
    Deno.exit(code);
}