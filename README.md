# Restaurant reviewer built with react and firebase

## Installation
```javascript
$ npm install
```

## Running in dev mode
```javascript
$ npm start
```

## Building for production
```javascript
$ webpack --config webpack/common.config.js
```

The built project will be placed into `dist` directory. 
Then create `index.html` file in `dist` directory with the following
contents:

```html
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Restaurant reviewer</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="bundle.css">
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUelD47T2md0YrpoWCOMd3HngUchKFGCA&libraries=places"></script>
</head>
<body>
<div id="root">
</div>

<script src="/bundle.js"></script>
</body>
</html>

```


## Running production version

To run this project in production you will need any simple server.
For example you can use `simpleHTTPserver` module from python.
 
 ```bash
 $ cd dist
 $ python -m SimpleHTTPServer 8000
 ```

Now head to `localhost:8000` and voila!
