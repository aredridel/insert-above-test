(function () {
    var buffer = []

    for (var i = 0; i < 200; i++) {
        buffer[i] = '<pre>' + i + ': hey\nhey\nhey\nwe\nare\nthe\nmonkeys<\/pre>';
    }

    var container = document.querySelector('section');

    var minSpace = 1000;
    var top = 0;
    var bottom = 0;

    requestAnimationFrame(function checkInsert() {
        var n = 0;
        while (container.scrollTop < minSpace) {
            insertSomeTop();
            if (n++ > 50) return console.warn('bail top');
        }

        while (container.scrollHeight - container.scrollTop - container.clientHeight < minSpace) {
            insertSomeBelow();
            if (n++ > 50) return console.warn('bail bottom');
        }

        requestAnimationFrame(checkInsert)
    })

    function insertSomeTop() {
        top = (top + 1) % buffer.length;
        insertKeepingScroll(container, el(buffer[buffer.length - top - 1]));
    }

    function insertSomeBelow() {
        bottom = (bottom + 1) % buffer.length;
        container.appendChild(el(buffer[bottom]))
    }

    function el(text) {
        var ins = document.createElement('div');
        ins.innerHTML = text;
        return ins
    }

    function insertKeepingScroll(container, ins) {
        var posBefore = container.scrollTop;
        insNode(container, ins);
        container.scrollTop = posBefore + ins.scrollHeight
    }

    function insNode(parent, child) {
        if (parent.hasChildNodes()) {
            parent.insertBefore(child, parent.firstChild);
        } else {
            parent.appendChild(child);
        }
    }
})()
