export interface IOption {
    fontSize?: number;
    color?: string;
    style?: string;
    fontFamily?: string;
    lineHeight?: number;
    textAlign?: 'left' | 'right' | 'center';
    wordBreak?: 'wrap' | 'break-all';
}
export interface IText {
    text: string;
    fontSize?: number;
    fontFamily?: string;
    style?: string;
    color?: string;
}
export interface IWord {
    text: string;
    width: number;
    font: string;
    color: string;
}
export default class CanvasText {
    ctx: CanvasRenderingContext2D;
    options: IOption;
    constructor(ctx: CanvasRenderingContext2D, options: IOption);
    getLines(texts: IText[], maxWidth: number): IWord[][];
    fillText(texts: IText[], maxWidth: number, x: number, y: number): void;
    fillParagraph(paragraph: string, maxWidth: number, x: number, y: number): void;
    render(lines: IWord[][], maxWidth: number, x: number, y: number): void;
}
