import * as fs from 'fs';

const fn = './data.json';

let content = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));

export const saveToFile = () => {
    fs.writeFileSync(fn, JSON.stringify(content));
}

export const addResource = (name) => {
    const newResourceId = Math.max(...(Object.keys(content.resources).map(v => +v))) + 1;
    content.resources[newResourceId] = name;
    saveToFile();
};
export const getResources = () => {
    return content.resources;
}
export const logStorage = () => {
    console.log(content);
}