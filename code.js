var _;
try {
    _ = require('bilby');
} catch(e) {
    _ = bilby;
}

// Implementations

var code = _.environment()
    .method('isPalindrome', _.isArray, function(a) {
        throw new Error("TODO");
    })
    .method('isPalindrome', _.isString, function(s) {
        throw new Error("TODO");
    });

// Tests

function writeLine(s) {
    if(typeof document != 'undefined') {
        document.body.innerHTML += '<div>' + s + '</div>';
    } else {
        console.log(s);
    }
}

function check(description, property, args) {
    return _.io(function() {
        var report = _.forAll(property, args);

        writeLine(description);
        writeLine(report.fold(
            "OK",
            function(inputs, tries) {
                return "Failed after " + tries + " tries: " + inputs.toString();
            }
        ));
    });
}

_.sequence(_.io, [
    check(
        'palindrome string is palindrome',
        function(s) {
            return true; //throw new Error("TODO");
        },
        [String]
    ),
    check(
        'not palindrome string is not palindrome',
        function(s) {
            return true; //throw new Error("TODO");
        },
        [String]
    ),
    check(
        'palindrome array is palindrome',
        function(a) {
            return true; //throw new Error("TODO");
        },
        [Array]
    ),
    check(
        'not palindrome array is not palindrome',
        function(a) {
            return true; //throw new Error("TODO");
        },
        [Array]
    )
]).perform();
