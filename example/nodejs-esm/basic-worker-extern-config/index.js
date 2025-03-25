import { Worker as WorkerIndex } from "flexsearch";
const dirname = import.meta.dirname;

(async function(){

    // create a simple index which can store id-content-pairs
    // and await (!) for the worker response
    const index = await new WorkerIndex({
        tokenize: "forward",
        config: dirname + "/config.js"
    });

    // some test data
    const data = [
        'cats abcd efgh ijkl mnop qrst uvwx cute',
        'cats abcd efgh ijkl mnop qrst cute',
        'cats abcd efgh ijkl mnop cute',
        'cats abcd efgh ijkl cute',
        'cats abcd efgh cute',
        'cats abcd cute',
        'cats cute'
    ];

    // add test data
    data.forEach((item, id) => {
        index.add(id, item);
    });

    // perform query
    const result = await index.search({
        query: "cute cat",
    });

    // display results
    result.forEach(i => {
        console.log(data[i]);
    });

}());
