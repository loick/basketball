(function () {
    var $closeBtn, $heading, $loading, $players, $playersAway, $playersHome, $stage, $switchBtn, $switcher, $team, $terrain, $world, anim, data, dom, events, init, pos, scenes, state;
    $stage = null;
    $world = null;
    $terrain = null;
    $team = null;
    $players = null;
    $playersHome = null;
    $playersAway = null;
    $switchBtn = null;
    $closeBtn = null;
    $heading = null;
    $loading = null;
    $switcher = null;
    data = {
        players: {
            home: [
                {
                    name: 'Dugat',
                    asset: 'Dugat.jpg',
                    origin: 'USA',
                    height: '1.82m',
                    shirt: '28',
                    pos: 'Meneur',
                    dob: '31',
                    lnb: 0,
                    europe:
                    {
                        eurochallenge:6,
                        eurocup:0,
                        euroleague:0,
                    },
                    goals: 21,
                    games: 3,
                    x: 100,
                    y: 170
                },
                {
                    name: 'Landry',
                    asset: 'Landry.jpg',
                    origin: 'France',
                    height: '1.98m',
                    shirt: '27',
                    pos: 'Ailier',
                    dob: '26',
                    lnb: 37,
                    europe:
                    {
                        eurochallenge:0,
                        eurocup:0,
                        euroleague:0,
                    },
                    goals: 5,
                    games: 27,
                    x: 180,
                    y: 365
                },
                {
                    name: 'Vassallo',
                    asset: 'Vassallo.jpg',
                    origin: 'Porto Rico',
                    height: '1.98m',
                    shirt: '5',
                    pos: 'Ailier / Arrière',
                    dob: '29',
                    lnb: 34,
                    europe:
                    {
                        eurochallenge:0,
                        eurocup:0,
                        euroleague:4,
                    },
                    goals: 21,
                    games: 1,
                    x: -150,
                    y: 200
                },
                {
                    name: 'Hill',
                    asset: 'Hill.png',
                    origin: 'Brazil',
                    height: '2.03m',
                    shirt: '4',
                    pos: 'Ailier Fort',
                    dob: '28',
                    lnb:0,
                    europe:
                    {
                        eurochallenge:12,
                        eurocup:18,
                        euroleague:0,
                    },
                    goals: 0,
                    games: 34,
                    x: -115,
                    y: 370
                },
                {
                    name: 'Taylor',
                    asset: 'Taylor.jpg',
                    origin: 'USA',
                    height: '2.03m',
                    shirt: '15',
                    pos: 'Pivot / Ailier Fort',
                    dob: '25',
                    lnb:0,
                    europe:
                    {
                        eurochallenge:12,
                        eurocup:0,
                        euroleague:0,
                    },
                    goals: 0,
                    games: 48,
                    x: 10,
                    y: 340
                }
            ],
            away: [
                {
                    name: 'Mutuale',
                    asset: 'Dugat.jpg',
                    origin: 'France',
                    height: '1.88m',
                    shirt: '9',
                    pos: 'Meneur',
                    dob: '24',
                    lnb:127,
                    europe:
                    {
                        eurochallenge:19,
                        eurocup:5,
                        euroleague:0,
                    },
                    goals: 1,
                    games: 16,
                    x: 100,
                    y: 170
                },
                {
                    name: 'Adams',
                    asset: 'Vassallo.jpg',
                    origin: 'USA',
                    height: '1.98m',
                    shirt: '16',
                    pos: 'Arrière',
                    dob: '25',
                    europe:
                    {
                        eurochallenge:0,
                        eurocup:0,
                        euroleague:0,
                    },
                    goals: 21,
                    games: 3,
                    x: 180,
                    y: 365
                },
                {
                    name: 'Lebrun',
                    asset: 'Landry.jpg',
                    origin: 'France',
                    height: '1.93m',
                    shirt: '11',
                    pos: 'Ailier / Arrière',
                    dob: '24',
                    lnb:124,
                    europe:
                    {
                        eurochallenge:5,
                        eurocup:6,
                        euroleague:1,
                    },
                    goals: 19,
                    games: 30,
                    x: -150,
                    y: 200
                },
                {
                    name: 'Lobela',
                    asset: 'Hill.png',
                    origin: 'France',
                    height: '2.06m',
                    shirt: '15',
                    pos: 'Pivot / Ailier Fort',
                    dob: '36',
                    lnb:4,
                    europe:
                    {
                        eurochallenge:0,
                        eurocup:0,
                        euroleague:0,
                    },
                    goals: 9,
                    games: 22,
                    x: -115,
                    y: 370
                },
                {
                    name: 'JBAM',
                    asset: 'Taylor.jpg',
                    origin: 'France',
                    height: '2.04m',
                    shirt: '15',
                    pos: 'Pivot',
                    dob: '36',
                    lnb:325,
                    europe:
                    {
                        eurochallenge:16,
                        eurocup:28,
                        euroleague:10,
                    },
                    goals: 9,
                    games: 22,
                    x: 10,
                    y: 340
                }
            ]
        }
    };
    state = {
        home: true,
        disabHover: false,
        swapSides: function () {
            if (this.home) {
                return this.home = false;
            } else {
                return this.home = true;
            }
        },
        curSide: function () {
            if (this.home) {
                return 'home';
            } else {
                return 'away';
            }
        }
    };
    pos = {
        world: {
            baseX: 0,
            baseY: 0,
            baseZ: -200
        },
        def: {
            goalie: [
                0,
                -50
            ]
        }
    };
    dom = {
        addPlayers: function (side) {
            var $el, key, ref, val;
            ref = data.players[side];
            for (key in ref) {
                val = ref[key];
                val.side = side;
                $el = this.addPlayer(val);
                $team.append($el);
            }
            $players = $('.js-player');
            $playersHome = $('.js-player[data-side="home"]');
            return $playersAway = $('.js-player[data-side="away"]');
        },
        addPlayer: function (data) {
            var $el;
            $el = $('<div class="js-player player" data-name="' + data.name + '" data-side="' + data.side + '" data-x="' + data.x + '" data-y="' + data.y + '"></div>');
            $el.append('<div class="player__label"><span>' + data.name + '</span></div>');
            $el.append('<div class="player__img"><img src=images/players/' + data.asset + '></div>');
            $el.prepend('<div class="player__card"> </div>');
            $el.prepend('<div class="player__placeholder"></div>');
            this.populateCard($el.find('.player__card'), data);
            return $el;
        },
        preloadImages: function (preload) {
            var i, promises;
            promises = [];
            i = 0;
            while (i < preload.length) {
                (function (url, promise) {
                    var img;
                    img = new Image();
                    img.onload = function () {
                        return promise.resolve();
                    };
                    return img.src = url;
                }(preload[i], promises[i] = $.Deferred()));
                i++;
            }
            return $.when.apply($, promises).done(function () {
                scenes.endLoading();
                return scenes.loadIn(1600);
            });
        },
        populateCard: function ($el, data) {
            return $el.append('<h3>' + data.name + '</h3>' + '<ul class="player__card__list"><li><span>DOB</span><br/>' + data.dob + ' yr</li><li><span>Height</span><br/>' + data.height + '</li><li><span>Origin</span><br/>' + data.origin + '</li></ul>' + '<ul class="player__card__list player__card__list--last"><li><span>Games</span><br/>' + data.games + '</li><li><span>Goals</span><br/>' + data.goals + '</li></ul>');
        },
        displayNone: function ($el) {
            return $el.css('display', 'none');
        }
    };
    events = {
        attachAll: function () {

            $switchBtn.on('click', function (e) {
                var $el;
                e.preventDefault();
                $el = $(this);
                if ($el.hasClass('disabled')) {
                    return;
                }
                scenes.switchSides();
                $switchBtn.removeClass('disabled');
                return $el.addClass('disabled');
            });

            return $players.on('click', function (e) {
                var $el;
                e.preventDefault();
                $el = $(this);
                if ($('.active').length) {
                    return false;
                }
                $el.addClass('active');
                scenes.focusPlayer($el);
                return setTimeout(function () {
                    return events.attachClose();
                }, 1);
            });
        },
        attachClose: function () {
            return $stage.one('click', function (e) {
                e.preventDefault();
                return scenes.unfocusPlayer();
            });
        }
    };
    scenes = {
        preLoad: function () {
            $playersAway.css('display', 'none');
            return true;
        },
        loadIn: function (delay) {
            var delayInc;
            if (delay == null) {
                delay = 0;
            }
            $world.velocity({
                opacity: 1,
                translateY: 0,
                translateZ: -200
            }, {
                duration: 1000,
                delay: delay,
                easing: 'spring'
            });
            anim.fadeInDir($heading, 300, delay + 600, 0, 30);
            anim.fadeInDir($switcher, 300, delay + 900, 0, 30);
            delay += 1200;
            delayInc = 30;
            return anim.dropPlayers($playersHome, delay, delayInc);
        },
        startLoading: function () {
            var images, key, ref, val;
            anim.fadeInDir($loading, 300, 0, 0, -20);
            images = [];
            ref = data.players.home && data.players.away;
            for (key in ref) {
                val = ref[key];
                images.push('images/players/' + val.asset);
            }
            return dom.preloadImages(images);
        },
        endLoading: function () {
            return anim.fadeOutDir($loading, 300, 1000, 0, -20);
        },
        arrangePlayers: function () {
            return $players.each(function () {
                var $el;
                $el = $(this);
                return $el.velocity({
                    translateX: parseInt($el.attr('data-x')),
                    translateZ: parseInt($el.attr('data-y'))
                });
            });
        },
        focusPlayer: function ($el) {
            var shiftY;
            data = $el.data();
            shiftY = data.y;
            if (shiftY > 0) {
                shiftY = data.y / 2;
            }
            $('.js-player[data-side="' + state.curSide() + '"]').not('.active').each(function () {
                var $unfocus;
                $unfocus = $(this);
                return anim.fadeOutDir($unfocus, 300, 0, 0, 0, 0, null, 0.2);
            });
            $world.velocity({
                translateX: pos.world.baseX - data.x,
                translateY: pos.world.baseY,
                translateZ: pos.world.baseZ - shiftY
            }, 600);
            $terrain.velocity({ opacity: 0.66 }, 600);
            return this.showPlayerCard($el, 600, 600);
        },
        unfocusPlayer: function () {
            var $el;
            $el = $('.js-player.active');
            data = $el.data();
            anim.fadeInDir($('.js-player[data-side="' + state.curSide() + '"]').not('.active'), 300, 300, 0, 0, 0, null, 0.2);
            $el.removeClass('active');
            $world.velocity({
                translateX: pos.world.baseX,
                translateY: pos.world.baseY,
                translateZ: pos.world.baseZ
            }, 600);
            $terrain.velocity({ opacity: 1 }, 600);
            return this.hidePlayerCard($el, 600, 600);
        },
        hidePlayerCard: function ($el, dur, delay) {
            var $card, $image;
            $card = $el.find('.player__card');
            $image = $el.find('.player__img');
            $image.velocity({ translateY: 0 }, 300);
            anim.fadeInDir($el.find('.player__label', 200, delay));
            return anim.fadeOutDir($card, 300, 0, 0, -100);
        },
        showPlayerCard: function ($el, dur, delay) {
            var $card, $image;
            $card = $el.find('.player__card');
            $image = $el.find('.player__img');
            $image.velocity({ translateY: '-=150px' }, 300);
            anim.fadeOutDir($el.find('.player__label', 200, delay));
            return anim.fadeInDir($card, 300, 200, 0, 100);
        },
        switchSides: function () {
            var $new, $old, delay, delayInc;
            delay = 0;
            delayInc = 20;
            $old = $playersHome;
            $new = $playersAway;
            if (!state.home) {
                $old = $playersAway;
                $new = $playersHome;
            }
            state.swapSides();
            $old.each(function () {
                var $el;
                $el = $(this);
                anim.fadeOutDir($el, 200, delay, 0, -60, 0);
                anim.fadeOutDir($el.find('.player__label'), 200, delay + 700);
                return delay += delayInc;
            });
            $terrain.velocity({ rotateY: '+=180deg' }, {
                delay: 150,
                duration: 1200
            });
            return anim.dropPlayers($new, 1500, 30);
        }
    };
    anim = {
        fadeInDir: function ($el, dur, delay, deltaX, deltaY, deltaZ, easing, opacity) {
            if (deltaX == null) {
                deltaX = 0;
            }
            if (deltaY == null) {
                deltaY = 0;
            }
            if (deltaZ == null) {
                deltaZ = 0;
            }
            if (easing == null) {
                easing = null;
            }
            if (opacity == null) {
                opacity = 0;
            }
            $el.css('display', 'block');
            $el.velocity({
                translateX: '-=' + deltaX,
                translateY: '-=' + deltaY,
                translateZ: '-=' + deltaZ
            }, 0);
            return $el.velocity({
                opacity: 1,
                translateX: '+=' + deltaX,
                translateY: '+=' + deltaY,
                translateZ: '+=' + deltaZ
            }, {
                easing: easing,
                delay: delay,
                duration: dur
            });
        },
        fadeOutDir: function ($el, dur, delay, deltaX, deltaY, deltaZ, easing, opacity) {
            var display;
            if (deltaX == null) {
                deltaX = 0;
            }
            if (deltaY == null) {
                deltaY = 0;
            }
            if (deltaZ == null) {
                deltaZ = 0;
            }
            if (easing == null) {
                easing = null;
            }
            if (opacity == null) {
                opacity = 0;
            }
            if (!opacity) {
                display = 'none';
            } else {
                display = 'block';
            }
            return $el.velocity({
                opacity: opacity,
                translateX: '+=' + deltaX,
                translateY: '+=' + deltaY,
                translateZ: '+=' + deltaZ
            }, {
                easing: easing,
                delay: delay,
                duration: dur
            }).velocity({
                opacity: opacity,
                translateX: '-=' + deltaX,
                translateY: '-=' + deltaY,
                translateZ: '-=' + deltaZ
            }, {
                duration: 0,
                display: display
            });
        },
        dropPlayers: function ($els, delay, delayInc) {
            return $els.each(function () {
                var $el;
                $el = $(this);
                $el.css({
                    display: 'block',
                    opacity: 0
                });
                anim.fadeInDir($el, 800, delay, 0, 50, 0, 'spring');
                anim.fadeInDir($el.find('.player__label'), 200, delay + 250);
                return delay += delayInc;
            });
        }
    };
    init = function ()
    {
        $stage = $('.js-stage');
        $world = $('.js-world');
        $switchBtn = $('.js-switch');
        $heading = $('.js-heading');
        $switcher = $('.toggle, .switcher');
        $closeBtn = $('.js-close');
        $terrain = $('.js-terrain');
        $team = $('.js-team');
        $loading = $('.js-loading');

        dom.addPlayers('home');
        dom.addPlayers('away');

        scenes.preLoad();
        scenes.arrangePlayers();

        events.attachAll();

        return scenes.startLoading();
    };
    $(document).ready(function () {
        return init();
    });
}.call(this));