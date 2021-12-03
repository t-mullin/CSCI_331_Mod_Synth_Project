# TMR-21 Modular Synth

## _Quickstart:_

`npm install`

`npm start`

The TMR-21 should be running at `http://localhost:3000/`

## _Development_

Additional modules should be developed based upon any of the files found in `/public/js/` prefixed with `add_`. Once you have the template for a new module created, titled `add_<module>.js`, take the following steps to obtain functionality with connections to other modules.

In `/public/js/audio.js`
- Add `<module_name>` to `eventListener` on `removeButton` and `addButton`
- Add `let num<module> = 0;` to the top of `audio.js`

In `/views/index.html`
- Add `<script src="js/add_<module>.js"></script>`

If you are encountering issues, first check whether the module you are adding has additional parameters outside of the standard `frequency` or `gain`. If this is the case, you will need to add another `else if` to the end of functions `connect_inputs` and `disconnect_inputs` to handle this new parameter. Additionally, in order to style this new module you should add an `.svg` file to `/public/img/` followed by an entry in `/public/css/styles.css` relating this image to the `div` corresponding to this new module.

To ensure a successful pull request, you should make sure that all cypress tests pass as they will be run by a github action.

## *Testing*

To run the testing suite use

`npx cypress run`

If this test passes, it should pass on github using continuous integration and will allow for a pull request. You are encouraged to expand tests as you expand web app functionality, as to prevent regressive merges.