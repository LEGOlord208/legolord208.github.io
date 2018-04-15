define('ace/mode/lolcode', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextMode = require("ace/mode/text").Mode;
var LOLCODEHighlightRules = require("ace/mode/lolcode_highlight_rules").LOLCODEHighlightRules;

var Mode = function() {
    this.HighlightRules = LOLCODEHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here. (see below)
}).call(Mode.prototype);

exports.Mode = Mode;
});

define('ace/mode/lolcode_highlight_rules', function(require, exports, module) {

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var LOLCODEHighlightRules = function() {

    this.$rules = {
        "start": [
            {
                token: "constant.language",
                regex: "WIN|FAIL|IT"
            },
            {
                token: "entity.name.function",
                regex: "HOW IZ I|IF U SAY SO"
            },
            {
                token: "keyword.control",
                regex: "FOUND YR|GTFO|I IZ|MKAY|O RLY\?|YA RLY|MEBBE|NO WAI|WTF\?|OMG|OMGWTF|OIC"
            },
            {
                token: "comment.line",
                regex: "\\bBTW\\b[^\\n]*",
                next: "comment"
            },
            {
                token: "comment.block",
                regex: "\\bOBTW\\b[\\s\\S]*?TLDR\\b"
            },
            {
                token: "support.function",
                regex: "VISIBLE"
            },
            {
                token: "constant.numeric",
                regex: "[0-9]+"
            },
            {
                token: "string.double",
                regex: "\"(\:.|[^\"])*\""
            }
        ],
        "comment": [
            {
                token: "comment.block",
                regex: "TLDR",
                next: "start"
            },
            {
                token: "comment.block",
                regex: ".*"
            }
        ]
    };
    
}

oop.inherits(LOLCODEHighlightRules, TextHighlightRules);

exports.LOLCODEHighlightRules = LOLCODEHighlightRules;
});
