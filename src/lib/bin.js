#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the command line arguments
const args = process.argv.slice(2);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompt the user for input
 * @param {string} question - The question to ask
 * @returns {Promise<string>} - The user's answer
 */
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Execute a shell command and print the output
 * @param {string} command - The command to execute
 * @param {string} cwd - The working directory
 * @returns {Buffer} - The command output
 */
function executeCommand(command, cwd) {
  try {
    return execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
    process.exit(1);
  }
}

/**
 * Initialize a new Veltify project
 */
async function initProject() {
  try {
    // Prompt for project name
    const projectName = await prompt('Project name: ');
    
    if (!projectName) {
      console.error('Project name is required');
      process.exit(1);
    }
    
    const projectPath = path.resolve(process.cwd(), projectName);
    
    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
      const overwrite = await prompt(`Directory ${projectName} already exists. Overwrite? (y/N): `);
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Aborting...');
        process.exit(0);
      }
    }
    
    console.log(`\nCreating a new Veltify project in ${projectPath}...`);
    
    // Create project directory if it doesn't exist
    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
    }
    
    // Clone the template repository
    console.log('\nCloning template repository...');
    executeCommand(`git clone https://github.com/veltify/template .`, projectPath);
    
    // Remove .git directory
    const gitDir = path.join(projectPath, '.git');
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true });
    }
    
    // Install dependencies
    console.log('\nInstalling dependencies...');
    executeCommand('npm install', projectPath);
    
    console.log('\n✅ Veltify project created successfully!');
    console.log('\nNext steps:');
    console.log(`  cd ${projectName}`);
    console.log('  git init && git add . && git commit -m "Initial commit"');
    console.log('  npm run dev');
    
    console.log('\nHappy coding! 🚀');
  } catch (error) {
    console.error('Error initializing project:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Main CLI logic
async function main() {
  const command = args[0];
  
  if (!command) {
    console.log('Veltify CLI - A tool for creating Veltify projects');
    console.log('\nUsage:');
    console.log('  npx veltify init    Create a new Veltify project');
    console.log('  npx veltify --help  Show this help message');
    process.exit(0);
  }
  
  switch (command) {
    case 'init':
      await initProject();
      break;
    case '--help':
    case '-h':
      console.log('Veltify CLI - A tool for creating Veltify projects');
      console.log('\nUsage:');
      console.log('  npx veltify init    Create a new Veltify project');
      console.log('  npx veltify --help  Show this help message');
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log('Use "npx veltify --help" to see available commands');
      process.exit(1);
  }
}

// Run the CLI
main().catch(error => {
  console.error('Error:');
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(String(error));
  }
  process.exit(1);
});
