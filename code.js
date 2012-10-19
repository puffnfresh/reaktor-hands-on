var _;
try {
    _ = require('bilby');
} catch(e) {
    _ = bilby;
}

// Implementations

// e.g. ListOf(Number)

// _.arb(ListOf(String), 100)
function ListOf(type) {
    if(!(this instanceof ListOf)) return new ListOf(type);

    this.type = type;
}

function isListOf(l) {
    return l instanceof ListOf;
}

function cons(value, tail) {
    if(!(this instanceof cons)) return new cons(value, tail);

    this.head = _.some(value);
    this.tail = _.some(tail);

    this.fold = function(f, v) {
        return f(tail.fold(f, v), value);
    };

    this.foldLeft = function(f, v) {
        return tail.foldLeft(f, f(v, value));
    };

    this.concat = function(list) {
        return this.fold(function(a, v) {
            return cons(v, a);
        }, list);
    };

    this.equals = function(list) {
        return this.fold(function(a, v) {
            return {
                accum: a.accum && a.list.head.map(function(x) {
                    return v == x;
                }).getOrElse(false),
                list: a.list.tail.getOrElse(nil)
            };
        }, {
            accum: true,
            list: list
        }).accum;
    };

    this.reverse = function() {
        return this.foldLeft(function(a, v) {
            return cons(v, a);
        }, nil);
    };
}

var nil = {
    fold: function(f, v) {
        return v;
    },
    foldLeft: function(f, v) {
        return v;
    },
    concat: function(list) {
        return list;
    },
    head: _.none,
    tail: _.none,
    equals: function(list) {
        return list === nil;
    },
    reverse: function() {
        return nil;
    }
};

function isList(l) {
    return (l instanceof cons) || l == nil;
}

_ = _.method('arb', isListOf, function(listOf, size) {
    var accum = nil,
        length = this.randomRange(0, size),
        i;

    for(i = 0; i < length; i++) {
        accum = cons(this.arb(listOf.type, size), accum);
    }

    return accum;
});

var code = _.environment()
    .method('isPalindrome', _.isArray, function(a) {
        return a == a.reverse();
    })
    .method('isPalindrome', _.isString, function(s) {
        return s == s.split('').reverse().join('');
    })
    .method('isPalindrome', isList, function(l) {
        return l.equals(l.reverse());
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
        'palindrome list is palindrome',
        function(l) {
            return code.isPalindrome(l.concat(l.reverse()));
        },
        [ListOf(Number)]
    ),
    check(
        'palindrome string is palindrome',
        function(s) {
            return code.isPalindrome(s + s.split('').reverse().join(''));
        },
        [String]
    ),
    check(
        'not palindrome string is not palindrome',
        function(s) {
            return !code.isPalindrome('a' + s + 'b');
        },
        [String]
    ),
    check(
        'palindrome array is palindrome',
        function(a) {
            return code.isPalindrome(a.concat(a.reverse()));
        },
        [Array]
    )/*,
    check(
        'not palindrome array is not palindrome',
        function(a) {
            return !code.isPalindrome([1].concat(a).concat(2));
        },
        [Array]
    )*/
]).perform();
