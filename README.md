# Initialize

```html

<script src="https://yiharng.github.io/cssjson.min.js"></script>  

```
# How to

```javascript

  var rc=cssjson();//Add a <style> to <head>
  var rc=cssjson("body");//Add a <style> to <body>
  var rc=cssjson("style");//Use the first <style> in the current webpage
  var rc=cssjson("#objid");//Use the <style> with id "objid"
   
```
## Functions

```javascript

  rc.list() //List all css name
  rc.list(".tag") //Get ".tag" index

  rc.get(".tag") //Get the CSS setting of ".tag" and return it in json format
  key=rc.get("@key") //Get the CSS setting of "@keyframes" named "key"

  rc.set(".tag",{color:"#f00"}) //Add or replace css settings in ".tag"
  rc.set(".tag","{color:#f00}") //Replace all original settings with the settings in the string

  rc.del(".tag")//Delete ".tag"

  key.list() //List all keyframes
  key.get("100%") //Get the setting of the frame and return it in json format
  key.set("100%",{background-color:"#00f"}) //Add or replace frame settings
  key.del("100%") // Delete frame
  
```

# Example

https://yhtpnotes.blogspot.com/2020/07/css-cssjsonjs.html

