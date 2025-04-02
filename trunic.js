const vowels = Object.freeze({
    a: ["o0", "o7", "o1", "o2"],
    ar: ["o1", "o2", "o5", "o6"],
    ah: ["o0", "o7", "o1"],
    ay: ["o1"],
    e: ["o0", "o5", "o6", "o7"],
    ee: ["o0", "o1", "o5", "o6", "o7"],
    eer: ["o0", "o1", "o5", "o7"],
    uh: ["o1", "o2"],
    eir: ["o0", "o1", "o5", "o7"],
    i: ["o5", "o6"],
    ie: ["o2"],
    ir: ["o0", "o2", "o5", "o6", "o7"],
    oh: ["o0", "o1", "o2", "o5", "o6", "o7"],
    oi: ["o6"],
    oo: ["o0", "o1", "o2", "o6", "o7"],
    ou: ["o0", "o6", "o7"],
    ow: ["o5"],
    ore: ["o0", "o1", "o2", "o5", "o7"],
});
const vowel_stats = {
    a: 0,
    ar: 0,
    ah: 0,
    ay: 0,
    e: 0,
    ee: 0,
    eer: 0,
    uh: 0,
    eir: 0,
    i: 0,
    ie: 0,
    ir: 0,
    oh: 0,
    oi: 0,
    oo: 0,
    ou: 0,
    ow: 0,
    ore: 0,
};
const consonants = Object.freeze({
    b: ["i0", "i5"],
    ch: ["i1", "i3"],
    d: ["i0", "i4", "i5"],
    f: ["i2", "i3", "i4"],
    g: ["i2", "i3", "i5"],
    h: ["i0", "i3", "i5"],
    j: ["i0", "i4"],
    k: ["i0", "i2", "i5"],
    l: ["i0", "i3"],
    m: ["i4", "i5"],
    n: ["i1", "i4", "i5"],
    ng: ["i0", "i3", "i1", "i2", "i4", "i5"],
    p: ["i3", "i2"],
    r: ["i0", "i3", "i2"],
    s: ["i0", "i3", "i2", "i4"],
    sh: ["i3", "i1", "i2", "i4", "i5"],
    t: ["i3", "i1", "i2"],
    th: ["i0", "i3", "i1", "i2"],
    th2: ["i0", "i3", "i4", "i5"],
    v: ["i0", "i1", "i5"],
    y: ["i0", "i3", "i1"],
    z: ["i0", "i3", "i1", "i5"],
    zh: ["i0", "i1", "i2", "i4", "i5"],
});
const consonant_stats = {
    b: 0,
    ch: 0,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    ng: 0,
    p: 0,
    r: 0,
    s: 0,
    sh: 0,
    t: 0,
    th: 0,
    th2: 0,
    v: 0,
    y: 0,
    z: 0,
    zh: 0,
};
let total_seen = 0;
let current_cons = undefined;
let has_guessed_cons = false;
let cons_correct = 0;
let current_vowel = undefined;
let has_guessed_vowel = false;
let vowel_correct = 0;
function reset_all() {
    clear_guesses();
    let $lines = $("#trune").children();
    $lines.each((_, e) => {
        if (e.id != "center") {
            e.setAttribute("stroke", "#fbfbfc");
            e.setAttribute("z", "0");
        }
    });
}
function sort_z_level() {
    var $lines = $("#trune").children();
    $lines.detach();
    var sorted = $lines.toArray().sort((a, b) => {
        var az = parseInt(a.getAttribute("z"), 10);
        var bz = parseInt(b.getAttribute("z"), 10);
        if (az > bz) {
            return 1;
        }
        else if (bz > az) {
            return -1;
        }
        else {
            return 0;
        }
    });
    var rune = $("#trune");
    sorted.forEach(element => rune.append(element));
}
function set_rune(toggles) {
    if (toggles.includes("i3") && !toggles.includes("i0")) {
        toggles.push("i3u");
    }
    toggles.forEach(element => {
        $("#trune").find("#" + element).attr("stroke", "#333");
        $("#trune").find("#" + element).attr("z", "1");
    });
    sort_z_level();
}
function random_vowel() {
    has_guessed_vowel = false;
    let idx = Math.floor(Math.random() * Object.keys(vowels).length);
    current_vowel = Object.keys(vowels)[idx];
    return current_vowel;
}
function random_consonant() {
    has_guessed_cons = false;
    let idx = Math.floor(Math.random() * Object.keys(consonants).length);
    current_cons = Object.keys(consonants)[idx];
    return current_cons;
}
function random_trune() {
    reset_all();
    set_rune(vowels[random_vowel()]);
    set_rune(consonants[random_consonant()]);
    total_seen += 1;
    $("#vowel-total").text(total_seen);
    $("#consonant-total").text(total_seen);
}
function guess_consonant(g) {
    if (current_cons === g) {
        document.getElementById(g).className = "correct";
        if (!has_guessed_cons) {
            cons_correct += 1;
            consonant_stats[g] += 1;
            $("#consonant-correct").text(cons_correct);
        }
    }
    else {
        document.getElementById(g).className = "wrong";
        has_guessed_cons = true;
    }
}
function guess_vowel(g) {
    if (current_vowel === g) {
        document.getElementById(g).className = "correct";
        if (!has_guessed_vowel) {
            vowel_correct += 1;
            vowel_stats[g] += 1;
            $("#vowel-correct").text(vowel_correct);
        }
    }
    else {
        document.getElementById(g).className = "wrong";
        has_guessed_vowel = true;
    }
}
function clear_guesses() {
    let $vowels = $("#vowel-guesses").children();
    $vowels.each((_, e) => {
        e.setAttribute("class", "");
    });
    let $consonants = $("#consonant-guesses").children();
    $consonants.each((_, e) => {
        e.setAttribute("class", "");
    });
}
window.addEventListener("load", random_trune);
