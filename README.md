# blackjack-html5

An HTML5 Canvas implementation of the python app I built as part of 'An Introduction to Interactive Programming in Python' Rice University course.

I went against all best practices regarding canvas development, and haven't used a framework (like [EaselJS](http://www.createjs.com/EaselJS) or [MelonJS](http://melonjs.org/)), also a state machine would have come handy (see [Jake Gordon's JFSM](https://github.com/jakesgordon/javascript-state-machine), it's great).

The main reason behind was to write a simple, pure HTML5 canvas app to port the original python game. This implementation is not even running a game loop, just simple game states.

To add some fun, I used [RequireJS](http://requirejs.org/) module loader and documented everything with [JSDoc3](http://usejsdoc.org/).

# Install

Just clone it from Github
```bash
$ git clone https://github.com/zsoltiii/blackjack-html5.git
```

Install all dependencies
```bash
$ npm install
```

#Play

Open up index.html locally in your working directory or alternatively **just run the [Demo](http://zsoltiii.github.io/blackjack-html5/index.html)**

**Controls**

Use the action buttons on screen to play the game.

```
Deal - New game
Hit - Take one more card
Stand - End turn
```
