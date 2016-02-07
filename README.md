# redux-algorithms

Various algorithms implemented in ES6 with [Redux].

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[Redux]: http://redux.js.org

## Why?

Redux is great for developing complicated applications since it simplifies the
issue of state - in redux there is only one state. Thus, assuming the view is
a pure function of the state, your view will always be consistent. Whereas
with storing pieces of the state among separate components, there is no
clear global state, and keeping everything in sync becomes complicated and
difficult to test.

Here, we take the ideas of the state time machine and apply it to visualizing
various algorithms. Any action will create a new state, and we can step through
the actions in order to skip forwards and backwards. Tied to a view that is a
pure function of the state, this creates a nice grounds for walking through
and understanding potentially complicated algorithms.

Furthermore, a type of pseudo-code can be written with actions that can be run
as actual code. Ideally, this module will serve as a "pseudo-code with redux
actions runner" and the community can build out many algorithmic visualizations.

## Run

`npm start` and then `npm run build:watch` in another tab.

## Algorithms

### Greedy

#### Interval Scheduling

WIP.
