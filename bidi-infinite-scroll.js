(function () {
    var buffer = []

    for (var i = 0; i < 200; i++) {
        buffer[i] = '<pre>' + i + ': hey\nhey\nhey\nwe\nare\nthe\nmonkeys<\/pre>';
    }
    
    function nth(n) {
        var off = n % buffer.length;
        if (off < 0) {
            return buffer[buffer.length + off];
        } else {
            return buffer[off];
        }
    }

    var container = document.querySelector('section');

    var minSpace = 1000;
    var maxSpace = 5000;
    var top = 0;
    var bottom = 0;
    var requested = false;
    var maxHeightFactor = 25;

    function checkInsert() {
        requested = false;
        var n = 0;

        if (container.scrollTop < minSpace) {
            while (container.scrollTop < maxSpace) {
                insertSomeTop();
            }
        }

        if (container.scrollHeight - container.scrollTop - container.clientHeight < minSpace) {
            while (container.scrollHeight - container.scrollTop - container.clientHeight < maxSpace) {
                insertSomeBelow();
            }
        }

        while (container.scrollHeight > container.clientHeight * maxHeightFactor) {
            if (container.scrollTop < container.scrollHeight - container.clientHeight - container.scrollTop) {
                removeFromBottom();
            } else {
                removeFromTop();
            }
        }
    }

    requestAnimationFrame(checkInsert)

    container.onscroll = function () {
        if (!requested) {
            requested = true
            requestAnimationFrame(checkInsert)
        } 
    }

    function removeFromBottom() {
        container.removeChild(container.childNodes[container.childNodes.length - 1])
        bottom -= 1;
    }

    function removeFromTop() {
        var scrollOffset = container.childNodes[0].clientHeight;
        container.removeChild(container.childNodes[0])
        container.scrollTop -= scrollOffset;
        top += 1;
    }

    function insertSomeTop() {
        top -= 1;
        insertKeepingScroll(container, el(nth(top)));
    }

    function insertSomeBelow() {
        bottom += 1;
        container.appendChild(el(nth(bottom)))
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
