#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const excludeDirs = [
	'node_modules',
	'.git',
	'dist',
	'build',
	'.kokimoki',
	'.vscode',
	'.github'
];
const excludeFiles = ['package-lock.json'];

const pattern =
	/((?:api|secret|token|key|password|auth|credential|access)[\w]*\s*(?:=|:)\s*['"`][A-Za-z0-9_\-+/=]{8,}['"`]|(?:API|SECRET|TOKEN|KEY|PASSWORD|AUTH|CREDENTIAL|ACCESS)[\w]*\s*(?:=|:)\s*['"`][A-Za-z0-9_\-+/=]{8,}['"`]|AIza[0-9A-Za-z_\-]{35}|sk-[a-zA-Z0-9]{48}|ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}|glpat-[a-zA-Z0-9_\-]{20}|xox[baprs]-[a-zA-Z0-9\-]{10,}|(?:=|:)\s*['"`][A-Za-z0-9_\-+/=]{20,}['"`])/gi;

function searchDir(dir) {
	let found = false;

	for (const file of readdirSync(dir)) {
		const filePath = join(dir, file);
		const stat = statSync(filePath);

		if (stat.isDirectory()) {
			if (!excludeDirs.includes(file)) {
				if (searchDir(filePath)) found = true;
			}
		} else if (!excludeFiles.includes(file)) {
			const content = readFileSync(filePath, 'utf-8');
			const lines = content.split('\n');

			lines.forEach((line, i) => {
				const matches = [...line.matchAll(pattern)];
				if (matches.length > 0) {
					console.log(`\n❌ Found potential secret:`);
					console.log(`   File: ${filePath}`);
					console.log(`   Line: ${i + 1}`);
					console.log(`   Code: ${line.trim()}`);
					found = true;
				}
			});
		}
	}

	return found;
}

const hasMatches = searchDir('.');

if (hasMatches) {
	console.log('\n⚠️  Potential secrets detected. Please review them.\n');
	process.exit(1);
} else {
	console.log('✅ No secrets or tokens found');
}
