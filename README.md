jq 的分页插件
=====

### 概述

一个简单实用的jq分页插件,该插件将ajax抽出只进行当前为第几页的计算，请在回调内自行写入ajax请求。

###效果
![preview](http://otfhhagqp.bkt.clouddn.com/github/jq/pagingjq_paging_preview.gif)

### 使用

1.html建立插入节点
``` html
    <div class="page-packing"></div>
```

2.引入jq和插件脚本
``` html
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="jxzPaging-1.1.1.js"></script>
```

3.调用脚本
``` javascript
    $('.page-packing').jxzPaging({
        pageSize: 3, // 每页数量
        totalNum: 100, // 总数
        callBack: function(currentPage) { // 回调 params: 当前页
            console.log(currentPage);
        }
    });
```

### 联系方式

如果你有好的意见或建议，欢迎加我的微信jin616347058,表示很乐意交流技术～～

![QR code](http://otfhhagqp.bkt.clouddn.com/my/6BF6200F4CBDE9DB368E67F9DF342511.jpg)
