import { EncoderOptions } from "../type.js";

// todo filter out minlength

/**
 * http://www.ranks.nl/stopwords
 * @type {Set<string>}
 */
export const filter = new Set(["a", "about", "above", "after", "again", "against", "all", "also", "am", "an", "and", "any", "are", "arent", "as", "at", "back", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "cannot", "cant", "come", "could", "couldnt",
//"day",
"did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during", "each", "even", "few",
//"first",
"for", "from", "further", "get",
//"give",
"go", "good", "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed",
//"hell",
"her", "here", "heres", "hers", "herself", "hes", "him", "himself", "his", "how", "hows", "i", "id", "if", "ill", "im", "in", "into", "is", "isnt", "it", "its", "itself", "ive", "just", "know", "lets", "like",
//"look",
"lot", "make", "made", "me", "more", "most", "mustnt", "my", "myself", "new", "no", "nor", "not", "now", "of", "off", "on", "once", "one", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
//"people",
"same", "say", "see", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such", "take", "than", "that", "thats", "the", "their", "theirs", "them", "themselves", "then", "there", "theres", "these", "they", "theyd", "theyll", "theyre", "theyve", "think", "this", "those", "through", "time", "times", "to", "too",
//"two",
"under", "until", "up", "us", "use", "very", "want", "was", "wasnt", "way", "we", "wed", "well", "were", "werent", "weve", "what", "whats", "when", "whens", "where", "wheres", "which", "while", "who", "whom", "whos", "why", "whys", "will", "with", "wont", "work", "would", "wouldnt",
//"year",
"ya", "you", "youd", "youll", "your", "youre", "yours", "yourself", "yourselves", "youve"]);

/**
 * @type {Map<string, string>}
 */

export const stemmer = new Map([
//["ational", "ate"],
//["iveness", ""],
//["fulness", ""],
//["ousness", ""],
["ization", ""],
//["tional", "tion"],
["biliti", ""], ["icate", ""], ["ative", ""],
//["alize", ""],
//["iciti", ""],
//["entli", ""],
//["ousli", ""],
//["alism", ""],
["ation", ""],
//["aliti", ""],
["iviti", ""], ["ement", ""], ["izer", ""], ["able", ""], ["ible", ""], ["alli", ""], ["ator", ""], ["less", ""], ["logi", ""], ["ical", ""], ["ance", ""], ["ence", ""], ["ness", ""], ["ble", ""], ["ment", ""],
//["nal", "n"],
["eli", ""], ["bli", ""], ["ful", ""], ["ant", ""], ["ent", ""], ["ism", ""], ["ate", ""], ["iti", ""], ["ous", ""], ["ive", ""], ["ize", ""], ["ing", ""], ["ion", ""], ["ies", "y"], ["al", ""], ["ou", ""], ["er", ""], ["ed", ""],
//["es", "e"],
["ic", ""], ["ly", ""], ["li", ""], ["s", ""]]);

/*
    he’s (= he is / he has)
    she’s (= she is / she has)
    I’ll (= I will)
    I’ve (= I have)
    I’d (= I would / I had)
    don’t (= do not)
    doesn’t (= does not)
    didn’t (= did not)
    isn’t (= is not)
    hasn’t (= has not)
    can’t (= cannot)
    won’t (= will not)
*/

// const explode = new Map([
//     ["^i'm$", "i am"],
//     ["^can't$", "can not"],
//     ["^cannot$", "can not"],
//     ["^won't$", "will not"],
//     ["'s$", " is has"],
//     ["n't$", " not"],
//     ["'ll$", " will"],
//     ["'re$", " are"],
//     ["'ve$", " have"],
//     ["'d$", " would had"],
// ]);

/**
 * @type EncoderOptions
 */
const options = {
    prepare: function (str) {
        return str
        // normalize symbols
        .replace(/´`’ʼ/g, "'")
        //.replace(/[_\-]+/g, " ")
        .replace(/&/g, " and ").replace(/\$/g, " USD ").replace(/£/g, " GBP ")
        // explode short forms
        .replace(/\bi'm\b/g, "i am").replace(/\b(can't|cannot)\b/g, "can not").replace(/\bwon't\b/g, "will not").replace(/([a-z])'s\b/g, "$1 is has").replace(/([a-z])n't\b/g, "$1 not").replace(/([a-z])'ll\b/g, "$1 will").replace(/([a-z])'re\b/g, "$1 are").replace(/([a-z])'ve\b/g, "$1 have").replace(/([a-z])'d\b/g, "$1 would had");
    },
    filter: filter,
    stemmer: stemmer
};
export default options;