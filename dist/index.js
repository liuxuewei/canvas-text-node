"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasText = /** @class */ (function () {
    function CanvasText(ctx, options) {
        if (!ctx)
            throw new Error('ctx is required');
        var defaultOptions = {
            fontSize: 14,
            color: 'black',
            style: null,
            fontFamily: 'Arial',
            lineHeight: 18,
            textAlign: 'left',
            wordBreak: 'wrap',
        };
        this.ctx = ctx;
        this.options = Object.assign({}, defaultOptions, options);
    }
    CanvasText.prototype.getLines = function (texts, maxWidth) {
        var _this = this;
        var lines = [[]];
        var currentWidth = 0;
        var _a = this.options, wordBreak = _a.wordBreak, fontSize = _a.fontSize, fontFamily = _a.fontFamily, style = _a.style, color = _a.color;
        (texts || []).forEach(function (segment) {
            var seperator = wordBreak === 'wrap' ? ' ' : '';
            var words = (segment.text || '').split(seperator);
            var size = segment.fontSize || fontSize;
            var font = segment.fontFamily || fontFamily;
            var textStyle = (segment.style || style || '') + " " + size + "px " + font;
            _this.ctx.font = textStyle;
            words.forEach(function (w, i) {
                var wordWidth = _this.ctx.measureText("" + w + seperator).width;
                var word = {
                    text: w,
                    width: wordWidth,
                    font: textStyle,
                    color: segment.color || color,
                };
                currentWidth += wordWidth;
                if (currentWidth > maxWidth) {
                    lines.push([word]);
                    currentWidth = wordWidth;
                }
                else {
                    var targetLine = lines[lines.length - 1];
                    targetLine.push(word);
                }
            });
        });
        return lines;
    };
    CanvasText.prototype.fillText = function (texts, maxWidth, x, y) {
        var lines = this.getLines(texts, maxWidth);
        this.render(lines, maxWidth, x, y);
    };
    CanvasText.prototype.fillParagraph = function (paragraph, maxWidth, x, y) {
        var text = [{ text: paragraph }];
        var lines = this.getLines(text, maxWidth);
        this.render(lines, maxWidth, x, y);
    };
    CanvasText.prototype.render = function (lines, maxWidth, x, y) {
        var _this = this;
        var currentY = y;
        var _a = this.options, textAlign = _a.textAlign, lineHeight = _a.lineHeight;
        lines.forEach(function (line) {
            var lineWidth = line.reduce(function (total, w) {
                total += w.width;
                return total;
            }, 0);
            var currentX;
            switch (textAlign) {
                default:
                case 'left':
                    currentX = x;
                    break;
                case 'center':
                    currentX = x + (maxWidth - lineWidth) / 2;
                    break;
                case 'right':
                    currentX = x + maxWidth - lineWidth;
                    break;
            }
            line.forEach(function (word) {
                _this.ctx.textBaseline = 'top';
                _this.ctx.font = word.font;
                _this.ctx.fillStyle = word.color;
                _this.ctx.fillText(word.text, currentX, currentY);
                currentX += word.width;
            });
            currentY += lineHeight;
        });
    };
    return CanvasText;
}());
exports.default = CanvasText;
