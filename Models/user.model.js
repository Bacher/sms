
function saveClient(obj) {
    if(obj.name && obj.name.length === 3) {
        return "Length must be not equal '3'";
    }
}

function saveServer(obj) {
    if(obj.name && obj.name.length === 4) {
        return "Length must be not equal '4'";
    }
}

function save(obj) {
    if(obj.name && obj.name === "Bacher") {
        return "Name must be not equal 'Bacher'";
    }
}
