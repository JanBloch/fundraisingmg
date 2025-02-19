export const getEinsatzPlan = (startDate, input) => {
    if (startDate == null)
        return;
    let out = [];
    Object.entries(input).forEach(v => {
        compileEinsatz(v[0], v[1], startDate).forEach(v => out.push(v));
    });
    return out;
}

const compileEinsatz = (name, list, startDate) => {
    let out = [];
    let oldIdx = 0;
    for (let i = 1; i < list.length; i++) {
        if (list[i] != list[oldIdx]) {
            let einsatzStart = new Date(startDate.valueOf());
            let einsatzEnd = new Date(startDate.valueOf());
            einsatzStart.setDate(einsatzStart.getDate() + Math.floor(oldIdx / 2));
            einsatzEnd.setDate(einsatzEnd.getDate() + Math.floor((i - 1) / 2));
            out.push(createEinsatz(name, einsatzStart, einsatzEnd, list[i - 1]));
            oldIdx = i;
        }
    }
    return out;
};
const createEinsatz = (name, from, to, esb) => {
    return { name, from, to, esb };
}