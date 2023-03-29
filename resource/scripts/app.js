var TASK_UI = {}

TASK_UI = {
    settings: {
        index: 0,
        fast: 0.2,
        speed: 0.4,
        width: 900,
        chart: null,
        years: null,
        currnt: null,
        flexible: false,
        flag: true,
        array: {
            database: [],
            personArr: [],
            membersArr: [],
            gamesArr: [],
            historyArr: [],
            promotionsArr: [],
            gamevilArr: [],
            com2usArr: [],
            anotherArr: [],
        },
        element: {
            wrapperId: 'body',
            taskId: '#TASK_UI',
            searchId: '#search',
            spotClass: '.spot',
            svgId: '#svg',
            autocompleteId: '#ui-id-1',
            headerClass: '.header',
            tabClass: '.tab',
            teamClass: '.team',
            memberClass: '.member',
            overlayClass: '.overlay',
            switchClass: '.inp-switch',
            mercuryClass: '.inp-mercury',
            graphClass: '.inp-graph',
            valueClass: '.value',
            historyClass: '.history',
            tableClass: '.table',
            theadClass: '.thead',
            tbodyClass: '.tbody',
            dropboxClass: '.dropbox',
            checkedClass: '.checked',
            layerClass: '.layer',
            closeClass: '.bg-close',
            loadingClass: '.loading',
            recordClass: '.record',
            datasetClass: '.dataset',
            errorClass: '.error',
            overlayerClass: '.overlayer',
            backClass: '.btn-back',
            endClass: '.btn-end',
            searchClass: '.btn-search',
            widgetClass: '.element',
            buttonTop: '.button-top',
            recommendClass: '.recommend',
            legendClass: '.legend',
            chartClass:'.button-chart',
            menutabClass: '.menu-tab',
            bannerClass: '.banner'
        }
    },
    init: function(){
        this.utils();
        this.present();
        this.database.init();
    },
    utils: function(){
        var _el = this.settings.element,
            _theme = localStorage.getItem('theme'),
            _mode = localStorage.getItem('mercury'),
            _graph = localStorage.getItem('graph');

        if(_theme == 'true'){
            $('body').addClass('flag');
            $(_el.switchClass).prop('checked', true);
        }else if(_theme == 'false'){
            $('body').removeClass('flag');
            $(_el.switchClass).prop('checked', false);
        }

        if(_mode == 'true'){
            $('body').addClass('mode');
            $(_el.mercuryClass).prop('checked', true);
        }else if(_mode == 'false'){
            $('body').removeClass('mode');
            $(_el.mercuryClass).prop('checked', false);
        }

        if(_graph == 'true'){
            $('body').addClass('graph');
            $(_el.graphClass).prop('checked', true);
        }else if(_graph == 'false'){
            $('body').removeClass('graph');
            $(_el.graphClass).prop('checked', false);
        }

        $(_el.buttonTop).on('click', function(){
            $(window).scrollTop(0);
        });
    },
    param: function(){
        var _el = this.settings.element,
            _member = getParameterByName('member');

        if(this.settings.flag){
            setTimeout(function(){
                $(_el.teamClass).find('li').eq(_member).click();
            }, 400);
            this.settings.flag = false;
        }

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    },
    present: function(){
        var _date = new Date(),
            _year = _date.getFullYear(),
            _el = this.settings.element;

        this.settings.years = _year;

        $(_el.valueClass).find('em').html(_year);
    },
    database: {
        init: function(){
            var _me = TASK_UI;

            this.games(_me);
            this.members(_me);
            this.promotions(_me);
        },
        games: function(_me){
            $.ajax({
                url: 'resource/scripts/games.json',
                type: 'GET',
                success: function(data){
                    _me.settings.array.gamesArr = data;
                },
                error: function(err){
                    $(_me.settings.element.errorClass).show();
                }
            });
        },
        members: function(_me){
            $.ajax({
                url: 'resource/scripts/members.json',
                type: 'GET',
                success: function(data){
                    _me.settings.array.personArr = data;
                    //_me.department(data);
                },
                error: function(err){
                    $(_me.settings.element.errorClass).show();
                }
            });
        },
        promotions: function(_me){
            $.ajax({
                url: 'resource/scripts/database.json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function(data){
                    var _game = _me.settings.array.gamesArr,
                    _gamelength = _game.length;

                    for(var i = 0; i < data.length; i++){
                        for(var j = 0; j < _gamelength; j++){
                            if(data[i].game.replace(/\s/g,'') == _game[j].name.replace(/\s/g,'')){
                                data[i].code = _game[j].no;
                                data[i].src = _game[j].src;
                                data[i].product = _game[j].name;
                                data[i].genre = _game[j].genre;
                            }
                        }
                    }

                    _me.settings.array.database = data;
                },
                error: function(err){
                    $(_me.settings.element.errorClass).show();
                }
            });

            $.ajax({
                url: 'resource/scripts/database.json',
                contentType: 'application/json; charset=utf-8',
                type: 'GET',
                success: function(data){
                    var _game = _me.settings.array.gamesArr,
                    _gamelength = _game.length;
                    
                    for(var i = 0; i < data.length; i++){
                        for(var j = 0; j < _gamelength; j++){
                            if(data[i].game.replace(/\s/g,'') == _game[j].name.replace(/\s/g,'')){
                                data[i].code = _game[j].no;
                                data[i].src = _game[j].src;
                                data[i].product = _game[j].name;
                                data[i].genre = _game[j].genre;
                            }
                        }
                    }
                    
                    //console.log(data)
                    _me.settings.array.database = data;

                    var _dataInterval = null;

                    _dataInterval = setInterval(function(){
                        if(_me.settings.array.database != 0 && data != -1){
                            _me.merge(data);
                            clearInterval(_dataInterval);
                        }
                    }, 10);
                },
                error: function(err){
                    $(_me.settings.element.errorClass).show();
                }
            });
        }
    },
    merge: function(data){
        var _me = this,
            _json = $.merge(data, _me.settings.array.database);
        
        _me.history(_me.settings.years, _json);
        _me.search(_json);

        //console.log(_json)
    },
    search: function(data){
        var _me = this,
            _array = [],
            _tag = [],
            _result = [],
            _keyword = [],
            _arrays = [],
            _html ='',
            _count = 0,
            _saveDate = null,
            _el = this.settings.element;

        for(var i = 0; i < data.length; i++){
            if(data[i].tag != undefined && data[i].tag != ''){
                var _split = data[i].tag.split(',');

                for(var j = 0; j < _split.length; j++){
                    var _key = _split[j].replace(/\s/gi, '')
                    if(_key.length > 1) _tag.push(_key);
                }
            }
        }

        $.each(_tag, function(i, key){
            if($.inArray(key, _result) === -1) _result.push(key);
        });

        for(var i = 0; i < data.length; i++){
            for(var j = 0; j < _me.settings.array.gamesArr.length; j++){
                if(data[i].game == _me.settings.array.gamesArr[j].name) {
                    _keyword.push(_me.settings.array.gamesArr[j].name);
                }
            }
        }

        $.each(_keyword, function(i, key){
            if($.inArray(key, _arrays) === -1) _arrays.push(key);
        });

        _arrays.sort(function(x, y){
            return x < y ? -1 : x > y ? 1 : 0;
        });

        _html += '<p class="inform">태그별 검색어</p>';
        _html += '<ul>';
        for(var i = 0; i < _result.length; i++){
            _html += '<li>#' + _result[i] + '</li>';
        }
        _html += '</ul>';
        _html += '<p class="inform">게임별 검색어</p>';
        _html += '<ul>';
        for(var i = 0; i < _arrays.length; i++){
            _html += '<li>#' + _arrays[i] + '</li>';
        }
        _html += '</ul>';
        _html += '<p class="notice">* 게임명, 프로모션명, 담당자, 태그 등으로 검색하세요.</p>';

        setTimeout(function(){
            $(_el.recommendClass).append(_html);
        }, 100);

        $(window).resize(function(){
            $(_el.searchId).autocomplete('search');
        });

        $(_el.searchId).focusin(function(){
            if(!$(_el.widgetClass).parents('.search').hasClass('open')) $(_el.recommendClass).show();
            $(this).parents('.search').addClass('open');
            $('html, body').css({overflow: 'hidden'});
            $(_el.tabClass).css({zIndex: -1});
        });

        $(_el.searchId).keyup(function(e){
            var _ln = $(this).val().length;

            if(_ln == 0){
                setTimeout(function(){
                    $(_el.recommendClass).show();
                }, 500);
            }
        })

        $(_el.searchId).autocomplete({
            source: function(request, response){
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), 'i');

                response($.grep(data, function(value){
                    return matcher.test(value.product) || matcher.test(value.title) || matcher.test(value.author) || matcher.test(value.tag);
                }));
            },
            delay: 400,
            minLength: 2,
            multiple: true,
            matchContains: false,
            autoFocus: true,
            appendTo: '#searchElem',
            create: function(){
                $(_el.autocompleteId).unbind();
                $(_el.widgetClass).append('<div></div>');
            },
            response: function(e, ui){
                var ui = ui.content;

                _count = 0;
                _array = [];

                ui.sort(function(x, y){
                    return y.url.split('/')[3] - x.url.split('/')[3];
                });

                ui.sort(function(x, y){
                    return y.year.replace(/[^0-9]/g,'') - x.year.replace(/[^0-9]/g,'');
                });

                $.each(ui, function(i, key){
                    var res = key.year.replace(/[^0-9]/g,'');
                    if($.inArray(res, _array) === -1) _array.push(res);
                });

                _array.sort(function(x, y){
                    return y - x;
                });

                setTimeout(function(){
                    $(_el.autocompleteId).scrollTop(0);
                });

                return false;
            },
            select: function(e, ui){
                //alert('selected: ' + ui.item.value);
                return false;
            },
            open: function(e){
                e.preventDefault();
                $(_el.endClass).fadeIn();
                $(_el.recommendClass).hide();

                var _term = $(this).data('uiAutocomplete');

                _term.menu.element
                    .find('.seo-prod, .seo-title, .seo-author, .seo-tag span')
                    .each(function(){
                        var _self = $(this);
                        var _keywords = _term.term.split(' ').join('|');

                        _self.html(_self.text().replace(new RegExp('(' + _keywords + ')', 'gi'), '<strong>$1</strong>'));
                    });

                return false;
            },
            close: function(e){
                e.preventDefault();
                if($(_el.searchId).val().length != 0){
                    $(_el.autocompleteId).show();
                }else{
                    $(_el.endClass).hide();
                    if(_me.settings.flexible){
                        $(_el.searchClass).show();
                    }
                }
                return false;
            },
        }).autocomplete('instance')
            ._renderItem = function(ul, item){
            var _template = '',
                _pagelength = item.pages.length;

            _count++;

            $('.count').html(_count);

            if(_count == 1){
                _template += '<div class="tag-code">';
                _template += '<span class="on">전체</span>';
                for(var i = 0; i < _array.length; i++){
                    _template += '<span>' + _array[i] + '년</span>';
                }
                _template += '</div>';
                _template += '<div class="result-count">총 <span class="count">1</span>개의 검색 결과를 찾았습니다.</div>'
            }
            if(_saveDate != item.url.split('/')[3]){
                _saveDate = item.url.split('/')[3];
                _template += '<div class="seo-date" data-tag="' + item.year.replace(/[^0-9]/g,'') + '">';
                _template += item.year + '년 ' + item.url.split('/')[3].substring(0,2) + '월 ' + item.url.split('/')[3].substring(2,4) + '일'
                _template += '</div>';
            }
            _template += '<div class="seo-wrapper" data-tag="' + item.year.replace(/[^0-9]/g,'') + '">';
            if(item.src == undefined || item.src == ''){
                _template += '<div class="seo-background"></div>';
            }else{
                _template += '<div class="seo-background" style="background-image:url(' + item.src + ')"></div>';
            }
            _template += '<div class="seo-desc">';
            _template += '<span class="seo-prod">' + item.product + '</span>';
            _template += '<span class="seo-title">' + item.title + '</span>';
            _template += '<span class="seo-author">' + item.author + '</span>';
            /*if('GAMEVIL' == item.company.toUpperCase()){
                _template += '<span class="seo-company gamevil">' + item.company + '</span>';
            }else if('COM2US' == item.company.toUpperCase()){
                _template += '<span class="seo-company com2us">' + item.company + '</span>';
            }*/
            _template += '</div>';
            if(item.tag != undefined && item.tag != ''){
                var _result = item.tag.split(',');

                _template += '<p class="seo-tag">';
                for(var i = 0; i < _result.length; i++){
                    _template += '<span>' + _result[i].replace(/\s/gi, '') + '</span>';
                }
                _template += '</p>';
            }
            _template += '<span class="seo-pages">';
            _template += '<span class="mercury-blank">';
            for(var i = 0; i < _pagelength; i++){
                if(item.pages[i].indexOf('pc') != -1 || item.pages[i].indexOf('pop') != -1){
                    _template += '<a href="mercury.html?url=' + item.url + '&lang=' + item.pages[i] + '" target="_blank" title="' + item.pages[i].split('_')[1] + '">' + item.pages[i] + '</a>';
                }else if(item.pages[i].indexOf('m') != -1){
                    _template += '<a href="mercury.html?url=' + item.url + '&lang=' + item.pages[i] + '" target="_blank" title="' + item.pages[i].split('_')[1] + '">' + item.pages[i] + '</a>';
                }else{
                    _template += '<a href="mercury.html?url=' + item.url + '&lang=' + item.pages[i] + '" target="_blank" title="' + item.pages[i] + '">' + item.pages[i] + '</a>';
                }
            }
            _template += '</span>';
            _template += '<span class="blank">';
            for(var i = 0; i < _pagelength; i++){
                if(item.pages[i].indexOf('pc') != -1 || item.pages[i].indexOf('pop') != -1){
                    _template += '<a href="https://test-markup.withhive.com' + item.url + '/' + item.pages[i] + '.html" target="_blank" title="' + item.pages[i].split('_')[1] + '">' + item.pages[i] + '</a>';
                }else if(item.pages[i].indexOf('m') != -1){
                    _template += '<a href="https://test-markup.withhive.com' + item.url + '/' + item.pages[i] + '.html" target="_blank" title="' + item.pages[i].split('_')[1] + '">' + item.pages[i] + '</a>';
                }else{
                    _template += '<a href="https://test-markup.withhive.com' + item.url + '/' + item.pages[i] + '.html" target="_blank" title="' + item.pages[i] + '">' + item.pages[i] + '</a>';
                }
            }
            _template += '</span>';
            _template += '</span>';
            _template += '</div>';

            return $('<li></li>')
                .data('ui-autocomplete-item', item)
                .append(_template)
                .appendTo(ul);
        };

        $(_el.autocompleteId).on('autocompleteSelect', function(event, node){
            console.log(event, node)
        });

        $(_el.recommendClass).on('click', 'li', function(){
            var _item = $(this).html().replace(/\#/g,''),
                e = $.Event('keydown');

            //if(_item == '탭') _item = '탭메뉴';

            e.which = 8;

            $(_el.searchId).val(_item);
            $(_el.searchId).trigger(e);
        });

        $(_el.backClass).on('click', function(){
            $(this).parents('.search').removeClass('open');
            $('html, body').css({overflow: ''});
            $(_el.tabClass).css({zIndex: ''});
            $(_el.recommendClass).hide();
            $(_el.autocompleteId).hide();
            $(_el.endClass).hide();
            $(_el.searchId).val('');
            if(_me.settings.flexible) $(_el.searchId).hide();

            $(_el.spotClass).hide();
        });

        $(_el.endClass).off().on('click', function(){
            $(_el.autocompleteId).hide();
            $(_el.recommendClass).show();
            $(_el.endClass).hide();
            $(_el.searchId).val('');
            $(_el.searchId).show().focus();
        });

        $(_el.searchClass).on('click', function(){
            if(!$(_el.widgetClass).parents('.search').hasClass('open')){
                $(_el.recommendClass).show();
                $(this).parents('.search').addClass('open');
                $(_el.searchId).show().focus();
            }
        });

        $(_el.widgetClass).on('click', '.tag-code span', function(){
            var _tag = $(this).html().replace(/[^0-9]/g,'');

            $('.seo-date, .seo-wrapper').hide();
            $(this).addClass('on').siblings().removeClass('on');

            if(_tag == ''){
                $('.seo-date, .seo-wrapper').show();
            }else{
                $(_el.widgetClass).find('[data-tag="' + _tag + '"]').show();
            }
            var _task = $('.seo-wrapper:visible').length;

            $('.result-count').find('.count').html(_task);
        });
    },
    department: function(work, teams){
        var _html = '',
            _me = this,
            _tm = TweenMax,
            _el = this.settings.element,
            _teamArr = this.settings.array.personArr;

        _teamArr = _teamArr.slice();

        var _tempArr = [];

        data = _teamArr.slice();

        $.each(teams, function(i, key){
            if($.inArray(key, _tempArr.name) == -1) _tempArr.push({name: key});
        });

        _tempArr.sort(function(a, b) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        for(var i = 0; i < teams.length; i++) {
            var _duplicatesFlag = true;
            for(var j = 0; j < data.length; j++){
                if(data[j].name == _tempArr[i].name){
                    _duplicatesFlag = false;
                    break;
                }
            }
            if(_duplicatesFlag){
                if(_tempArr[i].position == undefined) _tempArr[i].position = 'retire';
                data.push(_tempArr[i]);
            }
        }

        this.settings.array.membersArr = data;

        if(data[_me.settings.index] == undefined){
            this.settings.years = this.settings.currnt;
            $(_el.closeClass).click();
            alert(work + '년 데이타가 없습니다.');
            return false;
        }else{
            this.settings.currnt = work;
        }

        $(_el.teamClass).empty();

        var _datalength = data.length;

        for(var i = 0; i < _datalength; i++){
            if(data[i].position == 'retire'){
                _html += '<li class="retire"><span>';
                _html += data[i].name;
            }else{
                _html += '<li><span>';
                _html += data[i].name + ' ' + data[i].position;
            }
            _html += '</span></li>';
        }

        $(_el.teamClass).append(_html).ready(function(){
            $(this).find('li').eq(_me.settings.index).addClass('on');
            if(data[_me.settings.index].position == undefined){
                $(_el.memberClass).find('.name').html(data[_me.settings.index].name);
            }else{
                $(_el.memberClass).find('.name').html(data[_me.settings.index].name + ' ' + data[_me.settings.index].position);
            }
        });

        $(_el.memberClass).on('click', function(){
            var _state = $(_el.overlayClass).hasClass('open');

            if(_state) $(_el.closeClass).click();
            $(this).siblings('.overlay').addClass('open');

            if(_me.settings.flexible){
                var _width = $(_el.overlayClass).width();

                _tm.set(_el.overlayClass, {right: -_width, onComplete: function(){
                        _tm.to(_el.overlayClass, _me.settings.speed, {right: 0});
                    }});

                _tm.to(_el.taskId + ',' + _el.headerClass + ',' + _el.tabClass, _me.settings.speed, {left: -_width});
            }
        });

        $(_el.switchClass).on('change', function(){
            var _flag = $(this).is(':checked');

            (_flag) ? $('body').addClass('flag') : $('body').removeClass('flag');

            localStorage.clear();
            localStorage.setItem('theme', _flag);
        });

        $(_el.mercuryClass).on('click', function(){
            var _mode = $(this).is(':checked');

            (_mode) ? $('body').addClass('mode') : $('body').removeClass('mode');

            localStorage.clear();
            localStorage.setItem('mercury', _mode);
        });

        $(_el.graphClass).on('click', function(){
            var _graph = $(this).is(':checked');

            (_graph) ? $('body').addClass('graph') : $('body').removeClass('graph');

            localStorage.clear();
            localStorage.setItem('graph', _graph);
        });

        $(_el.closeClass).on('click', function(){
            if(_me.settings.flexible){
                var _width = $(_el.overlayClass).width(),
                    _wrapper = $(_el.dropboxClass).find('.wrapper'),
                    _height = _wrapper.height();

                _tm.to(_wrapper, _me.settings.fast, {bottom: -_height, onComplete: function(){
                        $(_el.dropboxClass).removeClass('open');
                    }});

                _tm.to(_el.overlayClass, _me.settings.speed, {right: -_width});
                _tm.to(_el.taskId + ',' + _el.headerClass + ',' + _el.tabClass, _me.settings.speed, {left: 0, onComplete: function(){
                        $(_el.overlayClass).removeClass('open');
                    }});

                $(_el.valueClass).show().parents('.select').removeClass('hide');
                $(_el.historyClass).removeClass('open');
            }else{
                $(this).parents(_el.layerClass).removeClass('open');
            }
        });
    },
    history: function(years, data){
        var _html = '',
            _tm = TweenMax,
            _change = false,
            _el = this.settings.element,
            _arr = this.settings.array;

        _arr.historyArr.push(String(years));
        $.each(data, function(i, key){
            var res = key.year.replace(/[^0-9]/g,'');
            if($.inArray(res, _arr.historyArr) === -1) _arr.historyArr.push(res);
        });
                       
        _arr.historyArr.sort(function(x, y) {return y - x;});
        
        var _historylength = _arr.historyArr.length;

        for(var i = 0; i < _historylength; i++){
            _html += '<li>';
            _html += _arr.historyArr[i];
            _html += '</li>';
        }

        $(_el.historyClass).find('ul').append(_html).ready(function(){
            $(_el.historyClass).find('li').eq(0).addClass('on');
        });

        $(_el.valueClass).on('click', function(){
            $(this).siblings(_el.historyClass).toggleClass('open');
            if(_me.settings.flexible){
                $(this).hide().parents('.select').addClass('hide');
            }
        });

        var _me = this;

        $(_el.historyClass).on('click', 'li', function(){
            var _val = $(this).html(),
                _active = $(this).hasClass('on');

            $(_el.closeClass).click();

            if(_active) return false;

            _me.settings.years = _val;

            permanentworker(_val, data);

            if(_me.settings.array.membersArr[_me.settings.index] == undefined) return false;

            $(_el.loadingClass).show();
            $(_el.valueClass).find('em').html(_val);
            $(_el.tabClass).find('li').removeClass('on').eq(0).addClass('on');
            $(_el.datasetClass).find('.c100').removeClass().addClass('c100');
            $(_el.recordClass).removeClass().addClass('record');
            $(this).addClass('on').siblings().removeClass('on');
            $(this).parents(_el.historyClass).removeClass('open');

            _me.sorting(_val, data, _me.settings.index);
        });

        $(_el.teamClass).on('click', 'li', function(){
            var _idx = $(this).index(),
                _user = $(this).html(),
                _active = $(this).hasClass('on');

            $(_el.closeClass).click();

            if(_active) return false;

            _me.settings.index = _idx;

            $(_el.loadingClass).show();
            $(_el.memberClass).find('.name').html(_user);
            $(_el.tabClass).find('li').removeClass('on').eq(0).addClass('on');
            $(_el.datasetClass).find('.c100').removeClass().addClass('c100');
            $(_el.recordClass).removeClass().addClass('record');
            $(this).addClass('on').siblings().removeClass('on');
            if(_me.settings.flexible){
                var _width = $(_el.overlayClass).width();

                _tm.to(_el.overlayClass, _me.settings.speed, {right: -_width});
                _tm.to(_el.taskId + ',' + _el.headerClass + ',' + _el.tabClass, _me.settings.speed, {left: 0, onComplete: function(){
                        $(_el.overlayClass).removeClass('open');
                    }});
            }else{
                $(this).parents(_el.layerClass).removeClass('open');
            }

            _me.sorting(_me.settings.years, data, _idx);
        });

        function permanentworker(_work, data){
            var _personArr = [];

            $.each(data, function(i, key){
                if(_work == key.year){
                    if(key.author != ''){
                        if($.inArray(key.author, _personArr) === -1) _personArr.push(key.author);
                    }
                }
            });

            _me.department(_work, _personArr);

            return false;
        }

        permanentworker(years, data);

        var _initiate = $(window).width();

        (_initiate < _me.settings.width) ? _change = true : _change = false;

        $(window).resize(function(){
            var _landscape = $(window).width();

            if(_landscape < _me.settings.width){
                _me.settings.flexible = true;
                $(_el.wrapperId).addClass('mobile');
                if(_change){
                    if(!$(_el.searchId).parents('.search').hasClass('open')){
                        $(_el.searchId).hide();
                    }else{
                        $(_el.searchId).show();
                    }
                    $(_el.loadingClass).show();
                    $(_el.tabClass).find('li').removeClass('on').eq(0).addClass('on');
                    _me.sorting(_me.settings.years, data, _me.settings.index);
                    _change = false;
                }
            }else{
                _me.settings.flexible = false;
                $(_el.wrapperId).removeClass('mobile');
                if(_change == false){
                    $(_el.loadingClass).show();
                    $(_el.searchId).show();
                    $(_el.overlayClass).css({right: 0});
                    $(_el.tabClass).find('li').removeClass('on').eq(0).addClass('on');
                    _me.sorting(_me.settings.years, data, _me.settings.index);
                    _change = true;
                }
            }
        }).trigger('resize');

        //this.sorting(years, data, 0);
    },
    sorting: function(years, data, index){
        var _arr = this.settings.array,
            _el = this.settings.element,
            _datalength = data.length,
            _memberlength = _arr.membersArr.length;

        data.sort(function(x, y) {
            return y.url.split('/')[4] - x.url.split('/')[4];
        });

        data.sort(function(x, y) {
            return x.url.split('/')[3] - y.url.split('/')[3];
        });

        var _yearslength = 12;

        _arr.promotionsArr = [];
        _arr.gamevilArr = [];
        _arr.com2usArr = [];
        _arr.anotherArr = [];

        for(var a = 1; a < _memberlength; a++){
            _arr.promotionsArr[a] = new Array();
            _arr.gamevilArr[a] = new Array();
            _arr.com2usArr[a] = new Array();
            _arr.anotherArr[a] = new Array();
            for(var b = 0; b < _yearslength; b++){
                _arr.promotionsArr[a][b] = new Array();
                _arr.gamevilArr[a][b] = new Array();
                _arr.com2usArr[a][b] = new Array();
                _arr.anotherArr[a][b] = new Array();
            }
        };

        var _promotionDonut = [];

        for(var i = 0; i < _datalength; i++){
            var _creatMonth = data[i].url.split('/')[3].substring(0,2);

            if(years == data[i].year){
                data[i].id = i;
                _promotionDonut.push(data[i]);
                for(var c = 0; c < _memberlength; c++){
                    if(_arr.membersArr[c].name == data[i].author){
                        for(var z = 1; z < _yearslength+1; z++){
                            if(_creatMonth == z){
                                data[i].month = z;
                                _arr.promotionsArr[c][z-1].push(data[i]); //연도별 프로모션
                            }
                        }
                    }
                }
                if('GAMEVIL' == data[i].company.toUpperCase() || 'HOLDINGS' == data[i].company.toUpperCase()){
                    for(var c = 0; c < _memberlength; c++){
                        if(_arr.membersArr[c].name == data[i].author){
                            for(var z = 1; z < _yearslength+1; z++){
                                if(_creatMonth == z){
                                    data[i].month = z;
                                    _arr.gamevilArr[c][z-1].push(data[i]); //게임빌, 홀딩스 프로모션
                                }
                            }
                        }
                    }
                }else if('COM2US' == data[i].company.toUpperCase()){
                    for(var c = 0; c < _memberlength; c++){
                        if(_arr.membersArr[c].name == data[i].author){
                            for(var z = 1; z < _yearslength+1; z++){
                                if(_creatMonth == z){
                                    data[i].month = z;
                                    _arr.com2usArr[c][z-1].push(data[i]); //컴투스 프로모션
                                }
                            }
                        }
                    }
                }else{
                    for(var c = 0; c < _memberlength; c++){
                        if(_arr.membersArr[c].name == data[i].author){
                            for(var z = 1; z < _yearslength+1; z++){
                                if(_creatMonth == z){
                                    data[i].month = z;
                                    _arr.anotherArr[c][z-1].push(data[i]); //미분류 프로모션
                                }
                            }
                        }
                    }
                }
            }
        }

        var _table = [],
            _donutData = [],
            _totalData = [],
            _gamevilData = [],
            _com2usData = [],
            _totalPage = [],
            _gamevilPage = [],
            _com2usPage = [],
            _sumData = [],
            _sumgamevilData = [],
            _sumcom2usData = [],
            _sumPage =[],
            _sumgamevilPage = [],
            _sumcom2usPage = [],
            _seriesData = [],
            _promotionResult = [],
            _gamevilResult = [],
            _com2usResult = [];

        _donutData = _promotionDonut;

        if(index != 0){
            _promotionResult[1] = _arr.promotionsArr[index];
            _gamevilResult[1] = _arr.gamevilArr[index];
            _com2usResult[1] = _arr.com2usArr[index];

            _table = _promotionResult;

            for(var x = 0; x < _yearslength; x++){
                _totalData[x] = new Array();
                _gamevilData[x] = new Array();
                _com2usData[x] = new Array();
                _totalPage[x] = new Array();
                _gamevilPage[x] = new Array();
                _com2usPage[x] = new Array();
                for(var y = 1; y < 2; y++){
                    _totalData[x].push(_promotionResult[y][x].length);
                    _gamevilData[x].push(_gamevilResult[y][x].length);
                    _com2usData[x].push(_com2usResult[y][x].length);
                    for(var z = 0; z < _promotionResult[y][x].length; z++){
                        _totalPage[x].push(_promotionResult[y][x][z].pages.length);
                    }
                    for(var z = 0; z < _gamevilResult[y][x].length; z++){
                        _gamevilPage[x].push(_gamevilResult[y][x][z].pages.length);
                    }
                    for(var z = 0; z < _com2usResult[y][x].length; z++){
                        _com2usPage[x].push(_com2usResult[y][x][z].pages.length);
                    }
                }
            }
        }else{
            _promotionResult = _arr.promotionsArr;
            _gamevilResult = _arr.gamevilArr;
            _com2usResult = _arr.com2usArr;

            _table = _promotionResult;
            _donutData = _promotionDonut;

            for(var x = 0; x < _yearslength; x++){
                _totalData[x] = new Array();
                _gamevilData[x] = new Array();
                _com2usData[x] = new Array();
                _totalPage[x] = new Array();
                _gamevilPage[x] = new Array();
                _com2usPage[x] = new Array();
                for(var y = 1; y < _memberlength; y++){
                    _totalData[x].push(_promotionResult[y][x].length);
                    _gamevilData[x].push(_gamevilResult[y][x].length);
                    _com2usData[x].push(_com2usResult[y][x].length);
                    for(var z = 0; z < _promotionResult[y][x].length; z++){
                        _totalPage[x].push(_promotionResult[y][x][z].pages.length);
                    }
                    for(var z = 0; z < _gamevilResult[y][x].length; z++){
                        _gamevilPage[x].push(_gamevilResult[y][x][z].pages.length);
                    }
                    for(var z = 0; z < _com2usResult[y][x].length; z++){
                        _com2usPage[x].push(_com2usResult[y][x][z].pages.length);
                    }
                }
            }
        }

        for(var s = 0; s < _yearslength; s++){
            var _seriesAll = _totalData[s].reduce(accumulate, 0),
                _seriesgamevil = _gamevilData[s].reduce(accumulate, 0),
                _seriescom2us = _com2usData[s].reduce(accumulate, 0),
                _pagesAll = _totalPage[s].reduce(accumulate, 0),
                _pagesgamevil = _gamevilPage[s].reduce(accumulate, 0),
                _pagescom2us = _com2usPage[s].reduce(accumulate, 0);

            _sumData.push(_seriesAll);
            _sumgamevilData.push(_seriesgamevil);
            _sumcom2usData.push(_seriescom2us);
            _sumPage.push(_pagesAll);
            _sumgamevilPage.push(_pagesgamevil);
            _sumcom2usPage.push(_pagescom2us);
        }

        function accumulate(x, y) {
            return x + y;
        }

        _seriesData.push({
                name: 'All',
                type: 'line',
                data: _sumData
            },
            {
                name: 'A company',
                type: 'bar',
                data: _sumgamevilData
            },
            {
                name: 'B company',
                type: 'bar',
                data: _sumcom2usData
            });

        var _me = this,
            _colors = ['#2E93fA', '#66DA26', '#E91E63'],
            _offset = 0,
            _stroke = [2, 1, 1];

        $(_el.tabClass).off().on('click', 'li', function(){
            var _resultData = [],
                _resultPage = [],
                _searchData = [],
                _colorsData = [],
                _strokeData = [],
                _idx = $(this).index();

            $(_el.closeClass).click();

            if(_idx == 0){
                _searchData = _seriesData;
                _colorsData = _colors;
                _offset = 0;
                _strokeData = _stroke;
            }else{
                _searchData = [_seriesData[_idx]];
                _colorsData = [_colors[_idx]];
                _offset = -20;
                _strokeData = [_stroke[_idx]];
            }

            switch(_idx){
                case 0: _table = _promotionResult;
                    _resultData = _sumData;
                    _resultPage = _sumPage;
                    $(_el.recordClass).removeClass().addClass('record');

                    break;
                case 1: _table = _gamevilResult;
                    _resultData = _sumgamevilData;
                    _resultPage = _sumgamevilPage;
                    $(_el.recordClass).removeClass().addClass('record green');

                    break;
                case 2: _table = _com2usResult;
                    _resultData = _sumcom2usData;
                    _resultPage = _sumcom2usPage;
                    $(_el.recordClass).removeClass().addClass('record red');

                    break;
            }

            $(_el.loadingClass).show();
            //$(_el.checkedClass).addClass('on');
            $(_el.recordClass + ' li').eq(0).find('dd').html(sum(_resultData));
            $(_el.recordClass + ' li').eq(1).find('dd').html(sum(_resultPage));
            for(var i = 0; i <_yearslength; i++){
                var _percent = Math.floor((_resultPage[i] / sum(_resultPage)) * 100 );

                $(_el.datasetClass + ' li').eq(i).find('.c100').removeClass().addClass('c100 p' + _percent);
                $(_el.datasetClass + ' li').eq(i).find('.column').css({height: _percent * 0.8});
                $(_el.datasetClass + ' li').eq(i).find('.pp').html(_resultPage[i] + 'P');
            }
            $(this).addClass('on').siblings().removeClass('on');

            _me.table(_table);
            _me.chart(_searchData, _colorsData, _offset, _strokeData);
        });

        function sum(_numberdata){
            var _result = 0,
                _numberdatalength = _numberdata.length;

            for(var i = 0; i < _numberdatalength; i++){
                _result += _numberdata[i];
            }
            return _result;
        }

        $(_el.recordClass + ' li').eq(0).find('dd').html(sum(_sumData));
        $(_el.recordClass + ' li').eq(1).find('dd').html(sum(_sumPage));
        $(_el.datasetClass).empty();

        for(var i = 0; i <_yearslength; i++){
            var _percent = Math.floor((_sumPage[i] / sum(_sumPage)) * 100 );

            var _html = '';

            _html += '<li>';
            _html += '<div class="c100 p' + _percent + '">';
            _html += '<div class="slice">';
            _html += '<div class="bar"></div><div class="fill"></div>';
            _html += '</div>';
            _html += '</div>';
            _html += '<div class="column" style="height:' + (_percent * 0.8) + '"></div>';
            _html += '<div class="pp">' + _sumPage[i] + 'P</div>';
            _html += '</li>';

            $(_el.datasetClass).append(_html);
        }

        this.table(_table);
        //console.log(_donutData.length);
        this.spot(_donutData, years);
        this.chart(_seriesData, _colors, _offset, _stroke);
        //console.log(_seriesData, _colors, _offset, _stroke)

        return false;
    },
    table: function(_table){
        var _html = '',
            _me = this,
            _productArr = [],
            _yearslength = 12,
            _el = this.settings.element;

        var _tablelength = _table.length;

        for(var x = 1; x < _tablelength; x++){
            for(var y = 0; y < _yearslength; y++){
                for(var z = 0; z < _yearslength; z++){
                    if(_table[x][y][z] != undefined){
                        if(_table[x][y][z].src == undefined || _table[x][y][z].src == ''){
                            _html += '<li class="row" data-id="' + _table[x][y][z].id + '" data-value="' + _table[x][y][z].month + '">';
                            _html += '<span class="game"><i class="thumb"></i>' + _table[x][y][z].game + '</span>';
                        }else{
                            _html += '<li class="row item-' +_table[x][y][z].code +'" data-id="' + _table[x][y][z].id + '" data-value="' + _table[x][y][z].month + '">';
                            _html += '<span class="game"><i class="thumb" style="background-image:url(' + _table[x][y][z].src + ')"></i>' + _table[x][y][z].product + '</span>';
                        }
                        _html += '<span class="prod">' + _table[x][y][z].title + '</span>';
                        _html += '<span class="company"><i class="' + _table[x][y][z].company.toLowerCase() + '">' + _table[x][y][z].company + '</i></span>';
                        if(_table[x][y][z].type == ''){
                            _html += '<span class="type">프로모션</span>';
                        }else{
                            _html += '<span class="type">' + _table[x][y][z].type + '</span>';
                        }
                        if(_table[x][y][z].url.split('/')[4] == undefined){
                            _html += '<span class="date">' + _table[x][y][z].url.split('/')[3] + '</span>';
                        }else{
                            _html += '<span class="date">' + _table[x][y][z].url.split('/')[3] + '/' + _table[x][y][z].url.split('/')[4] + '</span>';
                        }
                        _html += '<span class="author">' + _table[x][y][z].author + '</span>';
                        _html += '<span class="pages">';

                        var _pagelength = _table[x][y][z].pages.length;
                        _html += '<span class="mercury-blank">';
                        for(var p = 0; p < _pagelength; p++){
                            if(_table[x][y][z].pages[p].indexOf('pc') != -1 || _table[x][y][z].pages[p].indexOf('pop') != -1){
                                _html += '<a href="mercury.html?url=' + _table[x][y][z].url + '&lang=' + _table[x][y][z].pages[p] + '" target="_blank" class="' + _table[x][y][z].pages[p].split('_')[1] + '" title="' + _table[x][y][z].pages[p].split('_')[1] + '"></a>';
                            }else if(_table[x][y][z].pages[p].indexOf('m') != -1){
                                _html += '<a href="mercury.html?url=' + _table[x][y][z].url + '&lang=' + _table[x][y][z].pages[p] + '" target="_blank" class="mo ' + _table[x][y][z].pages[p].split('_')[1] + '" title="' + _table[x][y][z].pages[p].split('_')[1] + '"></a>';
                            }else{
                                _html += '<a href="mercury.html?url=' + _table[x][y][z].url + '&lang=' + _table[x][y][z].pages[p] + '" target="_blank" class="' + _table[x][y][z].pages[p] + '" title="' + _table[x][y][z].pages[p] + '"></a>';
                            }
                        }
                        _html += '</span>';
                        _html += '<span class="blank">';
                        for(var p = 0; p < _pagelength; p++){
                            if(_table[x][y][z].pages[p].indexOf('pc') != -1 || _table[x][y][z].pages[p].indexOf('pop') != -1){
                                _html += '<a href="https://test-markup.withhive.com' + _table[x][y][z].url + '/' + _table[x][y][z].pages[p] + '.html" target="_blank" class="' + _table[x][y][z].pages[p].split('_')[1] + '" title="' + _table[x][y][z].pages[p].split('_')[1] + '"></a>';
                            }else if(_table[x][y][z].pages[p].indexOf('m') != -1){
                                _html += '<a href="https://test-markup.withhive.com' + _table[x][y][z].url + '/' + _table[x][y][z].pages[p] + '.html" target="_blank" class="mo ' + _table[x][y][z].pages[p].split('_')[1] + '" title="' + _table[x][y][z].pages[p].split('_')[1] + '"></a>';
                            }else{
                                _html += '<a href="https://test-markup.withhive.com' + _table[x][y][z].url + '/' + _table[x][y][z].pages[p] + '.html" target="_blank" class="' + _table[x][y][z].pages[p] + '" title="' + _table[x][y][z].pages[p] + '"></a>';
                            }
                        }
                        _html += '</span>';
                        _html += '</span>';
                        _html += '</li>';

                        $.each(_table[x][y], function(i, key){
                            if(key.code != undefined){
                                if($.inArray(key.code, _productArr) === -1) _productArr.push(key.code);
                            }
                        });
                    }
                }
            }
        }

        _productArr.sort(function(x, y){
            return x - y;
        });

        $(_el.tbodyClass).empty();
        $(_el.tbodyClass).append(_html);

        /*
        var _listlength = $(_el.tbodyClass).find('.row').length;
        if(_listlength == 0) $(_me.settings.element.errorClass).show();
        */

        $(_el.tbodyClass).find('li').detach().sort(function(a, b){
            return $(b).attr('data-id') - $(a).attr('data-id');
        }).appendTo(_el.tbodyClass);

        this.select(_productArr);

    },
    select: function(_productArr){
        var _html = '',
            _tm = TweenMax,
            _el = this.settings.element,
            _arr = this.settings.array,
            _productlength = _productArr.length;

        for(var i = 0; i < _productlength; i++){
            _html += '<li data-category="' + _productArr[i] + '">';
            _html += _arr.gamesArr[_productArr[i]].name;
            _html += '</li>';
        }

        $(_el.dropboxClass).find('ul').empty();
        $(_el.dropboxClass).find('ul').append(_html);

        $(_el.theadClass).off().on('click', '.game', function(){
            $(_el.dropboxClass).toggleClass('open');
            if(_me.settings.flexible){
                var _wrapper = $(_el.dropboxClass).find('.wrapper'),
                    _height = _wrapper.height();

                _tm.set(_wrapper, {bottom: -_height, onComplete: function(){
                        _tm.to(_wrapper, _me.settings.fast, {bottom: 0});
                    }});
            }
        });

        var _me = this;

        $(_el.dropboxClass).off().on('click', 'li', function(e){
            var _idx = $(this).attr('data-category'),
                _active = $(this).hasClass('on');

            e.preventDefault();

            var _length = $(this).parent().find('li').length,
                _checklength = $(this).parent().find('li.on').length;

            if(_length == _checklength){
                $(_el.checkedClass).addClass('on');
            }else{
                $(_el.checkedClass).removeClass('on');
            }
            if(_checklength == 0) $(_el.tbodyClass).find('li').hide();

            if(_active){
                $(this).removeClass('on');
                $(_el.tbodyClass).find('.item-' + _idx).hide().addClass('hide');
            }else{
                $(this).addClass('on');
                $(_el.tbodyClass).find('.item-' + _idx).show().removeClass('hide');
            }

            _me.visible();
        });

        $(_el.checkedClass).off().on('click', function(e){
            var _active = $(this).hasClass('on');

            e.preventDefault();

            if(_active){
                $(this).removeClass('on').parent().find('li').removeClass('on');
                $(_el.tbodyClass).find('li').hide().addClass('hide');
            }else{
                $(this).addClass('on').parent().find('li').addClass('on');
                $(_el.tbodyClass).find('li').show().removeClass('hide');
            }

            _me.visible();
        });

        $(_el.tbodyClass).off().on('click', 'li', function(e){
            var _parent = $(this).parent().find('.row'),
                _active = $(this).hasClass('active');

            if(_me.settings.flexible){
                //e.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');
                _tm.to(_parent, _me.settings.fast, {marginBottom: 10});

                if(_active){
                    $(this).removeClass('active');
                    _tm.to(_parent, _me.settings.fast, {marginBottom: 10});
                }else{
                    _tm.to(this, _me.settings.fast, {marginBottom: 68});
                }
            }
        });

        this.visible();

    },
    visible: function(){
        var _el = this.settings.element;

        if($(_el.tbodyClass).find('.row:visible').length == 0 || $(_el.tbodyClass).find('.row').length == 0){
            $(_el.tableClass).addClass('nothing');
        }else{
            $(_el.tableClass).removeClass('nothing');
        }
    },
    chart: function(_seriesData, _colors, _offset, _stroke){
        var _me = this,
            _el = this.settings.element;

        var options = {
            chart: {
                height: 386,
                type: 'line',
                stacked: false,
                toolbar: {
                    show: false,
                },
                events: {
                    dataPointSelection: function(e, chart, config){
                        var _idx = config.dataPointIndex + 1;

                        $(_el.tbodyClass).find('li').hide();
                        $(_el.dropboxClass).find('li').removeClass('on');

                        $(_el.tbodyClass).find('li').each(function(i, item){
                            var _active = $(item).hasClass('hide');

                            if(!_active){
                                if($(item).attr('data-value') == _idx) $(item).show();
                            }

                            if($(item).css('display') != 'none'){
                                var _class = $(item).attr('class').replace(/[^0-9]/gi,'');

                                $(_el.dropboxClass).find('li[data-category="' + _class + '"]').addClass('on');
                            }
                        });

                        var _length = $(_el.dropboxClass).find('li').length,
                            _checklength = $(_el.dropboxClass).find('li.on').length;

                        if(_length == _checklength){
                            $(_el.checkedClass).addClass('on');
                        }else{
                            $(_el.checkedClass).removeClass('on');
                        }

                        _me.visible();
                    }
                }
            },
            colors: _colors,
            series: _seriesData,
            stroke: {
                curve: 'straight',
                width: _stroke
            },
            xaxis: {
                categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                position: 'bottom',
                labels: {
                    offsetY: 0,
                    style: {
                        colors: '#959595'
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + '건';
                    }
                },
                lines: {
                    show: false,
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: _offset,
                style: {
                    fontSize: '11px',
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '40%',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                onDatasetHover: {
                    highlightDataSeries: true
                },
                style: {
                    fontSize: '9px'
                },
                x: {
                    show: false,
                },
            },
            grid: {
                show: false,
            },
            legend: {
                show: false
            }
        }

        var chart = new ApexCharts(
            document.querySelector('#svg'),
            options
        );

        chart.render();
        _me.param();

        setTimeout(function(){
            if(_me.settings.flexible){
                chart.updateOptions(options);
                chart.updateOptions({
                    chart: {
                        height: 196
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px'
                            }
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '100%',
                        }
                    },
                    dataLabels: {
                        style: {
                            fontSize: '9px'
                        }
                    }
                });
            }else{
                chart.updateOptions(options);
            }
            $(_el.searchId).parent().fadeIn();
            $(_el.loadingClass).fadeOut();
        }, 1200);
    },
    spot: function(data, years){
        var _me = this,
            _el = this.settings.element,
            _arr = this.settings.array;

        var _donutArr = [],
            _sumdonutData = [],
            _gamedonutData = [],
            _donutData = [];

        for(var i = 0; i < _arr.gamesArr.length; i++) {
            _donutArr[i] = new Array();
            for(var j = 0; j < data.length; j++){
                if (_arr.gamesArr[i].name.replace(/\s/g,'') == data[j].game.replace(/\s/g,'')){
                    _donutArr[i].push(data[j]);
                }
            }
        }

        for(var i = 0; i <_donutArr.length; i++){
            if(_donutArr[i] != 0){
                _donutData.push({
                    game: _donutArr[i][0].game,
                    size: _donutArr[i].length,
                    genre: _donutArr[i][0].genre,
                    src: _donutArr[i][0].src
                });
            }
        }

        _donutData.sort(function(x, y) {
            return y.size - x.size;
        });

        for(var i = 0; i < _donutData.length; i++){
            _sumdonutData.push(_donutData[i].size);
        }

        _sumdonutData = [];

        for(var i = 0; i < _donutData.length; i++){
            _sumdonutData.push(_donutData[i].size);
            _gamedonutData.push(_donutData[i].game);
        }

        var _legendHtml = '',
            _sumCount = _sumdonutData.reduce(function(a, b){return a + b;}, 0);

        $(_el.legendClass).empty();

        $(_el.spotClass).find('.title strong').children().html(years + '년 - 프로모션');
        
        var _pageCount;
        (_donutData[0] == undefined) ? _pageCount = 10 : _pageCount = _donutData[0].size + 10;

        for(var i = 0; i < _donutData.length; i++){
            _legendHtml += '<li>';
            if(_donutData[i].src == undefined || _donutData[i].src == ''){
                _legendHtml += '<div class="thumbnail"></div>';
            }else{
                _legendHtml += '<div class="thumbnail" style="background-image:url(' + _donutData[i].src + ')"></div>';
            }
            _legendHtml += '<div class="info">';
            _legendHtml += '<strong>' + _donutData[i].game + '</strong>';
            _legendHtml += '<span class="genres">' + _donutData[i].genre + '</span>';
            _legendHtml += '<div class="bar">';
            _legendHtml += '<span style="width:' + ((_donutData[i].size / _pageCount) * 100) + '%;"><em>' + _donutData[i].size + '건 (' + ((_donutData[i].size / _sumCount) * 100).toFixed(1) + '%)</em></span>';
            _legendHtml += '</div>';
            _legendHtml += '</div>';
            _legendHtml += '</li>';
        }

        $(_el.legendClass).append(_legendHtml);
        $(_el.chartClass).on('click', function(){
            $('html, body').css({overflow: 'hidden'});
            $(_el.spotClass).show();
            _me.rate(data, years);
        });

        $(_el.menutabClass).find('li').removeClass('on').eq(0).addClass('on');
        $(_el.menutabClass).siblings('.article').find('.slide').hide().eq(0).show();

        $(_el.menutabClass).on('click', 'li', function(){
            var _idx = $(this).index();

            $(this).addClass('on').siblings().removeClass('on');
            $(this).parent().siblings('.article').find('.slide').hide().eq(_idx).show();

            if(_idx == 0) _me.rate(data, years);

        });
    },
    rate: function(data, years){
        var _me = this,
            _el = this.settings.element;

        var _gamevilRate = [],
            _com2usRate = [];

        for(var i = 0; i < data.length; i++){
            if('GAMEVIL' == data[i].company.toUpperCase() || 'HOLDINGS' == data[i].company.toUpperCase()){
                _gamevilRate.push(data[i]);
            }else if('COM2US' == data[i].company.toUpperCase()){
                _com2usRate.push(data[i]);
            }
        }

        $(_el.bannerClass).empty();

        var _html = '';

        _html += '<p><strong>' + years + '년</strong> 총 <strong>' + data.length + '</strong>개의 <br />프로모션 일감이 등록되었습니다.</p>';
        _html += '<ul>';
        _html += '<li><strong>' + _com2usRate.length + '개</strong><span>B company</span></li>';
        _html += '<li><strong>' + _gamevilRate.length + '개</strong><span>A company</span></li>';
        _html += '</ul>';

        $(_el.bannerClass).append(_html);

        var _totalRate = [_gamevilRate.length, _com2usRate.length];

        var options = {
            series: _totalRate,
            chart: {
                type: 'donut',
                width: 580,
            },
            //labels: ['GAMEVIL', 'COM2US'],
            colors: ['#66DA26', '#E91E63'],
            legend: {
                show: false
            },
            tooltip: {
                enabled: false,
            },
            responsive: [{
                breakpoint: _me.settings.width,
                options: {
                    chart: {
                        width: 350
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        var chart = new ApexCharts(document.querySelector('#circle'), options);

        chart.render();
        chart.updateOptions(options);
    }
}