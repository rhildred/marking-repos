import AdmZip from 'adm-zip';
import { readFile } from 'node:fs/promises';

import { glob } from 'node:fs/promises';

async function extractDownloadAndExtractZips() {
  // Use a glob pattern to match all .zip files in the current folder
  const zipFiles = await Array.fromAsync(glob('./*.zip'));
  for(const zipFile of zipFiles){
    const zip = new AdmZip(`./${zipFile}`);
    const firstWord = zipFile.split(/\s+/)[0];
    zip.extractAllTo(`./${firstWord}`, true);
    const htmlFiles = await Array.fromAsync(glob(`./${firstWord}/*.html`));
    for(const htmlFile of htmlFiles){
        const html = await readFile(htmlFile, 'utf-8');
        let stripOffNumber = htmlFile.split('- ')[1]
        if(typeof(stripOffNumber) != "undefined"){
            stripOffNumber = stripOffNumber.replace(/\s+$/, "");
            const match = html.match(/href=["']([^"']+)["']/i);
            
            if (match) {
                const repoDownloadUrl = match[1] + "/archive/refs/heads/main.zip";
                  const response = await fetch(url);
  
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                    // Get data as an ArrayBuffer
                    const arrayBuffer = await response.arrayBuffer();
                    
                    // Convert to a Node.js Buffer to save it to disk
                    const buffer = Buffer.from(arrayBuffer);
                    await writeFile('./downloaded_file.zip', buffer);
                    
                    console.log('Binary file saved successfully!');

            }

        }
        
        // Matches href=" or href=' and captures everything until the closing quote
        
    }
  }
}

extractDownloadAndExtractZips();

