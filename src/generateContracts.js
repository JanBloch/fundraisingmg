import { saveAs } from "filesaver.js";
import { createReport } from 'docx-templates';

import JSZip from "jszip";

export const generateContracts = (esVertragTemplate, verleihvertragTemplate, data, stammdaten) => {
    var zip = new JSZip();
    const esFolder = zip.folder("einsatzvertraege");
    const verleihFolder = zip.folder("verleihvertraege");
    data.forEach(entry => {
        console.log(entry.esb);
        const sd = (stammdaten.filter(v => v['Wo?'] == entry.esb) ?? [])[0];
        const concatName = entry.name + "-" + entry.esb.replace(/[^a-zA-Z0.9]/g, "") + ".docx";
        esFolder.file("einsatzvertrag-" + concatName, generateVertrag(esVertragTemplate, entry, sd));
        verleihFolder.file("verleihvertrag-" + concatName, generateVertrag(verleihvertragTemplate, entry, sd));
    })
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "fundraising-vertraege.zip");
        });
};
const generateVertrag = (template, data, stammdaten) => {
    return createReport({
        template,
        data: { esb_name: data.esb },
        cmdDelimiter: ["{", "}"]
    })
};