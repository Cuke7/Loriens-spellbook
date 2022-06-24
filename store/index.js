export const state = () => ({
    spells: [],
    // frenchCompat: false
})


export const mutations = {
    STORE_SPELL(state, spells) {
        state.spells = spells
    },
    // UPDATE_FRENCH_COMPAT(state, val) {
    //     state.frenchCompat = val
    // }
}

export const getters = {
    parse: (state) => (text) => {
        let regex =
            /@Compendium\[pf2e\.[ ]*?(.*?)\.[ ]*?(.*?)\]\{(.*?)\}/gm;
        let description = text;
        let matchs = description.matchAll(regex);
        for (const match of matchs) {
            description = description.replace(
                match[0],
                "<span href='/#" + match[1] + "/" + match[2] + "'>" + match[3] + "</span>"
            );
        }
        return description;
    },
}