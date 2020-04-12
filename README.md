# Deno .TS from github

## IMPORTANT

This program will fork this project and create a branch to do pr against this main project automatically.
And add your Deno project to the library!

## Install

install command 
`deno install libin --allow-write --allow-read --allow-run https://raw.githubusercontent.com/femave/libin/master/mod.ts`

## Usage

```
Usage:
    denon [TITLE] [REPOPATH] [TSPATH]*

    * optional

OPTIONS:
    TITLE    ==> Title that apear on to list.
    REPOPATH ==> Patah of your repository, ex: https://github.com/femave/live-server-reload
    TSPATH*   ==> Main .ts or .js path. Automatically we search on mod.ts or mod.js to index.

IMPORTANT:
    The main .ts should be mod.ts, if not add the main ts to [TSPATH]
```

## Deno TS Library index

---