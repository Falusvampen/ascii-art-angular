import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ascii-art',
  templateUrl: './ascii-art.component.html',
  styleUrls: ['./ascii-art.component.scss']
})
export class AsciiArtComponent implements OnInit {
  public inputText: string = '';
  public asciiArtText: string = '';
  public selectedFont: string = 'standard';
  private asciiMap: { [key: string]: string } = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readAndParseFontFile(this.selectedFont).then(map => {
      this.asciiMap = map;
    });
  }

  async readAndParseFontFile(font: string) {
    const filename = `assets/Fonts/${font}.txt`;
    try {
      const content = await this.http.get(filename, { responseType: 'text' }).toPromise();
      if (content) {
        const asciiChars = content.split('\n\n');
        const asciiMap: { [key: string]: string } = {};
        let asciiIndex = 32;
        for (const asciiArt of asciiChars) {
          asciiMap[String.fromCharCode(asciiIndex)] = asciiArt;
          asciiIndex++;
        }
        return asciiMap;
      } else {
        console.error('File content is undefined');
        return {};
      }
    } catch (error) {
      console.error('An error occurred while reading the file:', error);
      return {};
    }
  }

  async changeFont() {
    this.readAndParseFontFile(this.selectedFont).then(map => {
      this.asciiMap = map;
      this.textToAsciiArt();
    });
  }

  textToAsciiArt() {
  // Initialize an array to hold lines of ASCII art
  let asciiArtLines: string[] = [];
  
  // Split the input text into lines
  const inputLines = this.inputText.split('\n');
  
  // Process each line individually
  for (const line of inputLines) {
    // Initialize an array to hold the ASCII art for the current line
    const linesForCurrentInput = new Array(8).fill('');
  
    // Process each character in the line
    for (const char of line) {
      let charArt: string[];
      if (char === ' ') {
        charArt = new Array(8).fill('        ');
      } else if (this.asciiMap[char]) {
        charArt = this.asciiMap[char].split('\n');
      } else {
        charArt = new Array(8).fill('????????');
      }
  
      charArt.forEach((artLine, index) => {
        linesForCurrentInput[index] += artLine;
      });
    }
  
    // Combine the lines of ASCII art for the current line into a single string
    const combinedLinesForCurrentInput = linesForCurrentInput.join('\n');
  
    // Add the ASCII art for the current line to the overall array
    asciiArtLines.push(combinedLinesForCurrentInput);
  }
  
  // Join all the lines of ASCII art, separating them with extra newlines
  this.asciiArtText = asciiArtLines.join('\n\n');
}


}
