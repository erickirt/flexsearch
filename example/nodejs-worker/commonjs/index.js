const { Document } = require("flexsearch");

// loading test data
const data = require(__dirname + "/../data.json");

(async function(){

    // create the document index
    const document = new Document({
        worker: true,
        document: {
            id: "tconst",
            store: true,
            index: [{
                field: "primaryTitle",
                tokenize: "forward",
                config: __dirname + "/config.primaryTitle.js"
            },{
                field: "originalTitle",
                tokenize: "forward",
                config: __dirname + "/config.originalTitle.js"
            }],
            tag: [{
                field: "startYear"
            },{
                field: "genres"
            }]
        }
    });

    // add test data
    for(let i = 0; i < data.length; i++){
        await document.add(data[i]);
    }

    // perform a query
    const result = await document.search({
        query: "carmen",
        tag: {
            "startYear": "1894",
            "genres": [
                "Documentary",
                "Short"
            ]
        },
        suggest: true,
        enrich: true,
        merge: true
    });

    console.log(result);

}());
