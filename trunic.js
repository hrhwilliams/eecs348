const vowels = Object.freeze({
    a: ["o0", "o7", "o1", "o2"],
    ar: ["o1", "o2", "o5", "o6"],
    ah: ["o0", "o7", "o1"],
    ay: ["o1"],
    e: ["o0", "o5", "o6", "o7"],
    ee: ["o0", "o1", "o5", "o6", "o7"],
    eer: ["o0", "o1", "o5", "o7"],
    uh: ["o1", "o2"],
    ere: ["o0", "o1", "o5", "o7"],
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
let current_cons = undefined;
let has_guessed_cons = false;
let current_vowel = undefined;
let has_guessed_vowel = false;
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
    $("#vowel-total").text(parseInt($("#vowel-total").text()) + 1);
    $("#consonant-total").text(parseInt($("#consonant-total").text()) + 1);
}
function guess_consonant(g) {
    if (current_cons === g) {
        document.getElementById(g).className = "correct";
        if (!has_guessed_cons) {
            $("#consonant-correct").text(parseInt($("#consonant-correct").text()) + 1);
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
            $("#vowel-correct").text(parseInt($("#vowel-correct").text()) + 1);
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
