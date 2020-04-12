import { v4 } from "https://deno.land/std/uuid/mod.ts";

export default async function updateRepo() {
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