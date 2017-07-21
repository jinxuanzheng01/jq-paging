/**
 * Created by jxz on 16/12/21.
 */

(function paging($) {

    var __DEFAULT__ = {
        currentPage:1,
        pageSize:0,
        totalNum:0,
        pageNumber:'',
        callBack:null
    };

    function paging($insertNode) {
        var _paging = '<div class="paging">'+
                '<span class="btn-box">'+
                    '<a class="js-page-left"><</a>'+
                    '<span class="num-box"></span>'+
                    '<a class="js-page-right">></a>'+
                '</span>'+
                '<span class="text-box">共<span></span>页</span>'+
                '<span class="input-box">'+
                    '<input class="js-input" type="text" value="1">'+
                    '<a class="js-page-submit" href="javascript:;">Go</a>'+
                '</span>'+
            '</div>';
        $insertNode.find('.paging').remove();
        $insertNode.append(_paging);
    }

    paging.prototype = {
        render:function () {
            var $this = this,_pageNumber = $this.pageNumber;
            var _pageNumBtn = '',_pageNumBtnArr = [];
            var $parentNode = $this.$insertNode,$pageNumBtn = $parentNode.find('.paging .num-box');

            for (var i = 0; i< _pageNumber;i++){
                if ($this.currentPage < 6 || _pageNumber <= 7){
                    if (i == $this.currentPage-1){
                        _pageNumBtn = '<a class="hover js-page-num" data-page="'+(i+1)+'">'+(i+1)+'</a>';
                    }else if(i<7){
                        _pageNumBtn = '<a class="js-page-num" data-page="'+(i+1)+'">'+(i+1)+'</a>';
                    }else {
                        _pageNumBtn = '<span class="paging-ellipsis">...</span>' +
                            '<a class="js-page-num" data-page="' + _pageNumber + '">' + _pageNumber + '</a>';
                        _pageNumBtnArr.push(_pageNumBtn);
                        break;
                    }
                }else if ($this.currentPage-1 > _pageNumber - 6 && _pageNumber >7){
                    if ( _pageNumber-i == $this.currentPage){
                        _pageNumBtn = '<a class="hover js-page-num" data-page="'+(_pageNumber-i)+'">'+(_pageNumber-i)+'</a>';
                    }else if(i<7){
                        _pageNumBtn = '<a class="js-page-num" data-page="'+(_pageNumber-i)+'">'+(_pageNumber-i)+'</a>';
                    }else {
                        _pageNumBtn = '<a class="js-page-num" data-page="' + 1 + '">' + 1 + '</a>'+
                                      '<span class="paging-ellipsis">...</span>';
                        _pageNumBtnArr.push(_pageNumBtn);
                        _pageNumBtnArr.reverse();
                        break;
                    }
                }else if ($this.currentPage >= 6 && $this.currentPage < _pageNumber-4 && _pageNumber > 10){
                    if (i < 3){
                        _pageNumBtn = '<a class="js-page-num" data-page="'+($this.currentPage+(i-3))+'">'+($this.currentPage+(i-3))+'</a>';
                    }else if ( i == 3){
                        _pageNumBtn = '<a class="hover js-page-num" data-page="'+$this.currentPage+'">'+$this.currentPage+'</a>';
                    }else if( i > 3 && i < 7 ){
                        _pageNumBtn = '<a class="js-page-num" data-page="'+($this.currentPage+(i-3))+'">'+($this.currentPage+(i-3))+'</a>';
                    }else {
                        var _pageNumBtn1 = '<a class="js-page-num" data-page="' + 1 + '">' + 1 + '</a>'+
                            '<span class="paging-ellipsis">...</span>';
                        var _pageNumBtn2 =  _pageNumBtn = '<span class="paging-ellipsis">...</span>' +
                            '<a class="js-page-num" data-page="' + _pageNumber + '">' + _pageNumber + '</a>';
                        _pageNumBtnArr.unshift(_pageNumBtn1);
                        _pageNumBtnArr.push(_pageNumBtn2);
                        break;
                    }
                }
                _pageNumBtnArr.push(_pageNumBtn);
            }
            $pageNumBtn.html(_pageNumBtnArr);
            $parentNode.find('.text-box >span').text(_pageNumber);
            //绑定事件
            var $allList = $parentNode.find('a');
            $allList.unbind().on('click',{$that:this},$this.bindEvent);
        },

        bindEvent:function (e) {
            var $this = $(this),$that = e.data.$that;

            if ($this.hasClass('js-page-num')){
                $that.currentPage = $this.data('page');
            }

            if($this.hasClass('js-page-left')){
                $that.currentPage = $that.currentPage-1;
                if($that.currentPage<1){
                    $that.currentPage = 1;
                    alert('已经是第一页了');
                }
            }

            if($this.hasClass('js-page-right')){
                $that.currentPage = $that.currentPage+1;
                if($that.currentPage>$that.pageNumber){
                    $that.currentPage = $that.pageNumber;
                    alert('已经是最后一页了');
                }
            }

            if($this.hasClass('js-page-submit')){
                var $pageInput = $('.paging .input-box>input');
                var reg = new RegExp("^\\d+$");
                var _pageInputVal = $pageInput.val();
                if (reg.test(_pageInputVal)){
                    if (_pageInputVal> $that.pageNumber || _pageInputVal < 1){
                        $pageInput.val('');
                        return alert('请输入在范围内的数字');
                    }else {
                        $that.currentPage = parseInt(_pageInputVal);
                    }
                }else {
                    $pageInput.val('');
                    return alert("请输入数字")
                }
            }
            $that.handler()
        },

        handler:function () {
            var $this = this;
            $this.callBack($this.currentPage);
            $this.render();
        },
    };

    $.fn.jxzPaging = function (config) {
        var page = new paging(this);
        $.extend(page,__DEFAULT__,config,{pageNumber:Math.ceil(config.totalNum/config.pageSize),$insertNode:this});
        page.handler();
        return page
    }
})(jQuery);