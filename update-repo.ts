

export default async function updateRepo(branchId: string) {
    console.log('update repo');
    const gitAdd = ['git', 'add', '.'];
    const gitCommit = ['git', 'commit', '-m', 'Added new repo to README.md'];
    const gitPush = ['git', 'push', 'origin', `feature_${branchId}`];
    const currentRevision = ['git', 'rev-parse', 'HEAD'];
    const gitPr = ['git', 'request-pull'];
    const deleteDir = ['cd', '..', 'rm', '-rf', 'deno-library'];

    const add = Deno.run({ cmd: [...gitAdd] });
    if ((await add.status()).code !== 0) {
        console.log(`Git add failed`);
        Deno.exit();
    }
    const commit = Deno.run({cmd: [...gitCommit]});
    if ((await commit.status()).code !== 0) {
        console.log(`Git commit failed`);
        Deno.exit();
    }
    const push = Deno.run({cmd: [...gitPush]});
    if ((await push.status()).code !== 0) {
        console.log(`Git push failed`);
        Deno.exit();
    }
}