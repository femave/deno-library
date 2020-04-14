import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";

export default async function createRepo (branchId: string) {

    const cloneRepo = ['git', 'clone', 'https://github.com/femave/deno-library.git'];
    const entryToRepo = `${Deno.cwd()}\\deno-library`;
    const checkoutBranch = ['git', 'checkout', '-b', `feature_${branchId}`];
    
    ensureDirSync('/deno-library');
    const clone = Deno.run({cmd: [...cloneRepo]});
    if ((await clone.status()).code !== 0) {
        console.log(`Git clone failed`);
        Deno.exit();
    }
    Deno.chdir(entryToRepo);
    const checkout = Deno.run({cmd: [...checkoutBranch]}); 
    if ((await checkout.status()).code !== 0) {
        console.log(`Git checkout failed`);
        Deno.exit();
    }

}