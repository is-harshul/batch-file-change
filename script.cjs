const fs = require('fs');
const path = require('path');

/** colors for console logging in terminal */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[100m',
    crimson: '\x1b[48m',
  },
};

/**
 * The function replaces a specific variable in a file with a new variable.
 * @param filePath - The path to the file you want to update.
 * @param oldString - The oldString parameter is the variable that you want to replace in the file.
 * @param newString - The `newString` parameter is the value that you want to replace the
 * `oldString` with in the file.
 */
function replaceVariableInFile(filePath, oldString, newString) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');

    /** Attempting to update file */
    const updatedContents = fileContents.replace(oldString, newString);

    if (updatedContents !== fileContents) {
      // Only write the updated contents if changes were made
      fs.writeFileSync(filePath, updatedContents, 'utf8');
      console.log(
        colors.bg.black,
        colors.fg.green,
        `Updated ${filePath}`,
        colors.reset,
      );
      return true; // Indicates that the file was modified
    }
  } catch (error) {
    console.error(
      colors.bg.black,
      colors.fg.red,
      `Error updating ${filePath}: ${error}`,
      colors.reset,
    );
  }
  return false; // Indicates that the file was not modified
}

/* USER INPUTS START 👇 */

// Folder where your files are located
const folderPath = './';
const fileNameRegex = /env.*/;

// Variable or value you want to change
const oldString = 'AUTH_TOKEN = 1241pdm1p';
const newString = 'AUTH_TOKEN = 1ja-s9fu-912323';

/* USER INPUT END 👆 */

let modifiedFileCount = 0;

/**
 * The function processes all files in a given folder, recursively searching for files that match a
 * specific regex pattern and replacing a variable/string/value within those files.
 * @param _folderPath - The `_folderPath` parameter is the path to the folder that contains the files
 * you want to process.
 */
function processFilesInFolder(_folderPath) {
  fs.readdirSync(_folderPath).forEach((file) => {
    const filePath = path.join(_folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Recursion if folder found instead of file
      processFilesInFolder(filePath);
    } else if (filePath.match(fileNameRegex)) {
      // Factory fn
      if (replaceVariableInFile(filePath, oldString, newString)) {
        modifiedFileCount++;
      }
    }
  });
}

// Start processing files in the specified folder
processFilesInFolder(folderPath);

// Print the count of modified files
if (modifiedFileCount === 0) {
  console.log(
    colors.bg.black,
    colors.fg.yellow,
    'No files modified.',
    colors.reset,
  );
} else {
  console.log(
    colors.bg.black,
    colors.fg.green,
    `Modified ${modifiedFileCount} files.`,
    colors.reset,
  );
}
