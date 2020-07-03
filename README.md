# cssjson

```javascript

  var rc=cssjson();//在 head 新增一個 style
  var rc=cssjson("body");//在 body 新增一個 style
  var rc=cssjson("style");//使用目前網頁中的第一個 style
  var rc=cssjson("#objid");//使用 id 為 objid 的 style

```
# Functions

```javascript

  rc.list() //列所有的 css 的 tag
  rc.list(".tag") //取得 tag 的索引位置

  rc.get(".tag") //取得 tag 的 CSS 設定，以 json 型態回傳
  key=rc.get("@key") //取得 keyframes 名稱為 key 的 CSS 設定

  rc.set(".tag",{color:"#f00"}) //新增或取代 tag 中的 css 設定
  rc.set(".tag","{color:#f00}") //以字串中的設定取代原來的所有設定

  rc.del(".tag")//刪除該 tag

  key.list() //列出所有的 keyframes 
  key.get("100%") //取得該 frame 的設定，以 json 型態回傳
  key.set("100%",{background-color:"#00f"}) //新增或取代 frame 的設定
  key.del("100%") // 刪除 frame
  
```
