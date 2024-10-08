/* eslint-disable no-console */

import { execa } from 'execa';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '../');
const packagesDir = 'apps';
const packagesPath = path.join(rootPath, packagesDir);
const packages = fs.readdirSync(packagesPath);

const {
  docker: { registry },
  homepage,
} = createRequire(`${rootPath}/`)('./package.json');
const { version } = createRequire(`${rootPath}/`)('./lerna.json');

const exec = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', cwd: rootPath, ...opts });

const imageInfo = (target, tag) => {
  if (!packages.includes(target)) {
    throw new Error(`Invalid target: '${target}'`);
  }
  const targetPath = `${packagesPath}/${target}`;
  const targetPackage = createRequire(import.meta.url)(`${targetPath}/package.json`);
  const name = targetPackage.name.replace('@', '');
  const packageName = `${registry}/${name}`;
  const currentImage = `${packageName}:v${version}`;
  const tagImage = `${packageName}:${tag}`;

  return { packageName, currentImage, tagImage };
};

yargs(hideBin(process.argv))
  .command(
    'build <target>',
    'build docker image',
    {
      tag: { alias: 't', default: 'latest' },
      verbose: { alias: 'v', type: 'boolean' },
    },
    async (args) => {
      const { target, tag, verbose } = args;
      const { currentImage, tagImage } = imageInfo(target, tag);
      const dockerArgs = [
        'build',
        '.',
        '--target',
        target,
        '--label',
        `org.opencontainers.image.source=${homepage}`,
        '-t',
        currentImage,
        '-t',
        tagImage,
      ];
      if (verbose) {
        dockerArgs.push('--progress', 'plain');
      }
      console.log('Running docker:', dockerArgs.join(' '));
      await exec('docker', dockerArgs);
    },
  )
  .command(
    'push <target>',
    'push docker image',
    {
      tag: { alias: 't', default: 'latest' },
      verbose: { alias: 'v', type: 'boolean' },
    },
    async (args) => {
      const { target, tag, verbose } = args;
      const { packageName } = imageInfo(target, tag);
      const dockerArgs = ['push', packageName, '-a'];
      if (verbose) {
        dockerArgs.push('--progress', 'plain');
      }
      console.log('Running docker:', dockerArgs.join(' '));
      await exec('docker', dockerArgs);
    },
  )
  .help()
  .parse();
