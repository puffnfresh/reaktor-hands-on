# Reaktor Hands On: Pure Functional Programming in Plain JavaScript

## Introduction (10 mins)

Who am I?

What is pure functional programming?

Why is it important?

## Setup (10 mins)

Get the workshop files:

    git clone git@github.com:pufuwozu/bilby-workshop.git

Open up code.htm if you're going to use a web browser.

Or install bilby if you're using node.js:

    npm install bilby

## QuickCheck (15 minutes)

QuickCheck is a form of *automated specification testing*. Tests are
written algebraically.

Let's fix the broken tests.

Now let's write a list data structure using tests first.

## Immutable multimethod environments (10 mins)

A multimethod dispatches based on a predicate. In bilby, a multimethod
belongs to an immutable environment:

    var env = _.environment();

Adding methods:

    env.method('length', _.isArray, function(a) {
        return a.length;
    });

This returns a new environment with the method added. The method can
be called like:

    env.length([1, 2, 3]);

Extend the environment with some common list functions.

## Functional data structures (15 mins)

### Option

Add methods to get the first/last/nth element of the list. If the
element doesn't exist, return `_.none`, otherwise return the element
wrapped in `_.some`.

### Either

Create two functions, `left` and `right`. Their signatures will look
like:

    left: List[Either[A, B]] => List[A]
    right: List[Either[A, B]] => List[B]

## Operator syntax (30 mins)

The `Do` function gives us some fancy operator overloading.

Monads (`>=`) give us *programmable semicolons*.

Kleislis (`>>`) give us a *composable monad*.

Applicatives (`*`) give us *independent actions*.

Semigroups (`+`) give us the *append function*.

Functors (`<`) give us the *map function*.

Define as many as possible for our List.

## Functional lenses (10 mins)

Solution to updating nested data structures.
