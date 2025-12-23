#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

function extractKeys(file, regex) {
	const content = readFileSync(join(projectRoot, file), 'utf-8');

	// Special handling for YAML files
	if (file.endsWith('.yaml') || file.endsWith('.yml')) {
		return [...content.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]);
	}

	return [...content.matchAll(regex)].map((m) => m[1]);
}

function isKeyUsed(key) {
	const srcDir = join(projectRoot, 'src');
	const excludeFiles = ['schema.ts', 'default.config.yaml'];

	// Patterns that indicate config key usage
	const patterns = [
		new RegExp(`config\\.${key}\\b`, 'g'),
		new RegExp(`config\\['${key}'\\]`, 'g'),
		new RegExp(`config\\["${key}"\\]`, 'g'),
		new RegExp(`\\b${key}:\\s*z\\.`, 'g') // Schema definition
	];

	function searchDir(dir) {
		for (const file of readdirSync(dir)) {
			const filePath = join(dir, file);
			const stat = statSync(filePath);

			if (stat.isDirectory()) {
				if (searchDir(filePath)) return true;
			} else {
				const shouldExclude = excludeFiles.some((ef) => filePath.endsWith(ef));
				if (!shouldExclude) {
					const content = readFileSync(filePath, 'utf-8');
					if (patterns.some((pattern) => pattern.test(content))) {
						return true;
					}
				}
			}
		}
		return false;
	}

	return searchDir(srcDir);
}

console.log('🔍 Checking config entries...\n');

const schemaKeys = extractKeys('src/config/schema.ts', /(\w+):[\s\n\r]*z\./g);
const yamlKeys = extractKeys('default.config.yaml');

const allKeys = [...new Set([...schemaKeys, ...yamlKeys])];
const unusedKeys = allKeys.filter((key) => !isKeyUsed(key));

if (unusedKeys.length > 0) {
	console.error(
		'❌ Remove unused entries from schema.ts and/or default.config.yaml:\n'
	);
	unusedKeys.forEach((key) => console.error(`  - ${key}`));
	console.error('');
	process.exit(1);
}

console.log('✅ Config and schema passed the check!\n');
