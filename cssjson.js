function cssjson(sel)
{
    let r={}
    let cssloc="head";

    r.css=null;
    if (sel)
    {
        if (typeof(sel)=="string")
        {
            let s=document.querySelector(sel);
            if (s.toString().indexOf("HTMLStyleElement")>0)
            {
                r.css=s;
            }
            else
            {
                cssloc=sel;
            }
        }
        else
        {
            r.css=sel;
        }
    }
    
    if (!r.css)
    {
        r.css=document.createElement("style")
    }

    r.insert=function(s,n)
    {
        if (!n) n=r.css.sheet.cssRules.length;
        r.css.sheet.insertRule(s,n);
    }
    r.del=function(n)
    {
        if (typeof(n)=="string")
        {
            n=r.list(n);
            if (n<0) return false;
        }
        r.css.sheet.deleteRule(n);
        return true;
    }
    r.version=function()
    {
        return "cssjson V1.0.1 2020/7/23 yiharng@gmail.com"
    }
    r.list=function(s)
    {
        let list=[];
        let i,k;
        let rules=r.css.sheet.cssRules;

        for (i=0;i<rules.length;i++)
        {
            k=rules[i].selectorText;
            if (!k) k="@"+rules[i].name;
            if (s)
            {
                if (k==s) return i;
                continue;
            }
            list.push(k);
        }
        if (s) return -1;
        return list;
    }
    r.get=function(n)
    {
        if (typeof(n)=="string")
        {
            n=r.list(n);
            if (n<0) return null;
        }
        let csstxt=r.css.sheet.cssRules[n].cssText;

        function css2json(txt)
        {
            let a=txt.match(/\{(.*)\}/)[1].split(";");

            let i;
            let j={}

            for (i in a)
            {
                let m;
                let k=a[i].split(":");
                if (k.length<2) continue;
                for (m=2;m<k.length;m++)
                {
                    k[1]+=":"+k[m];
                }
                j[k[0].trim()]=k[1].trim();
            }
            return j;
            
        }
        if (csstxt[0]=="@")
        {
            let k={}

            k.kf=r.css.sheet.cssRules[n];
            k.list=function()
            {
                let i;
                let list=[];
                for (i=0;i<k.kf.cssRules.length;i++)
                {
                    list.push(k.kf.cssRules[i].keyText);
                }
                return list;
            }
            k.get=function(s)
            {
                let ss=k.kf.findRule(s);
                if (!ss) return null;

                return css2json(ss.cssText);
            }
            k.del=function(s)
            {
                k.kf.deleteRule(s);
            }
            k.set=function(name,j)
            {
                let g=k.get(name);
                if (!g)
                {
                    g={};
                }
                else
                {
                    k.del(name)
                }

                if (j===null) return;

                let hh;
                
                if (typeof(j)=="string")
                {
                    hh=j;
                }
                else
                {
                    hh="{"+mergestr(g,j)+"}";
                }
                k.kf.appendRule(name+" "+hh);
            }

            return k;
        }
        else
        {
            return css2json(csstxt);
        }

    }
    function mergestr(g,j)
    {
        let i;
        let hh="";
        for (i in j)
        {
            g[i]=j[i];
        }
        for (i in g)
        {
            if (g[i]===null) continue;
            hh+=i+":"+g[i]+";";
        }

        return hh;
    }
    r.set=function(name,j)
    {
        let n=r.list(name);
        let g;
        if (n<0) 
        {
            g={};
            n=0;
        }
        else
        {
            g=r.get(n);
            r.del(name);
        }

        if (j===null) return;

        let hh;

        if (name[0]=="@")
        {
            name="@keyframes "+name.substr(1);
            if (typeof(j)=="string")
            {
                hh=j;
            }
            else
            {
                hh="{}";
            }
        }
        else
        {
            if (typeof(j)=="string")
            {
                hh=j;
            }
            else
            {
                hh="{"+mergestr(g,j)+"}";
            }
        }

        r.insert(name+" "+hh,n);
    }

    if (!sel) 
    {
        document.querySelector(cssloc).append(r.css);
    }
    return r;
}
