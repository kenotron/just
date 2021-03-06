import path from 'path';
import fs from 'fs-extra';

let gitRootCache: string = '';

export function findGitRoot() {
  if (gitRootCache) {
    return gitRootCache;
  }

  let cwd = process.cwd();
  let root = path.parse(cwd).root;
  let found = false;
  while (!found && cwd !== root) {
    if (fs.pathExistsSync(path.join(cwd, '.git'))) {
      found = true;
      break;
    }

    cwd = path.dirname(cwd);
  }

  if (found) {
    gitRootCache = path.join(cwd);
  }

  return gitRootCache;
}
