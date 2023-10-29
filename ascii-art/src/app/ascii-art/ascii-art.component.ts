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
  private asciiMap: { [key: string]: string } = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.readAndParseFontFile('assets/Fonts/standard.txt').then(map => {
      this.asciiMap = map;
    });
  }

  async readAndParseFontFile(filename: string) {
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


  textToAsciiArt() {
    const lines = new Array(8).fill('');
    for (const char of this.inputText) {

      if (!this.asciiMap[char]) continue;
      
      const charArt = this.asciiMap[char].split('\n');
      charArt.forEach((line, index) => {
        lines[index] += line + '';
      });
    }
    this.asciiArtText = lines.join('\n');
  }
}
