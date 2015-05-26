"use strict";
!function(e) {
	window.isIE = e.browser.msie || e.browser.mozilla
			&& e.browser.version == "11.0";
	window.ltie10 = parseInt(e.browser.msie && e.browser.version) < 10;
	window.ltie8 = parseInt(e.browser.msie && e.browser.version) < 8;
	if (!ltie10) {
		e("#ieCss").remove()
	}
	if (ltie8) {
		e(".ie_block").show()
	}
}(jQuery);

var isInited = false;

$(function(e) {
	window.mapInit = function() {
		if (!isInited) {
			var t = e(window).width();
			var i = e(window).height();
			var n = function() {
				t = e(window).width();
				i = e(window).height();
				if (t < 960) {
					e(".map").css({
						height : t * .5625 + "px",
						bottom : "150px"
					});
					e(".points").css({
						height : t * .5625 + "px",
						bottom : "150px"
					});
					e(".summary_mobile").css({
						height : i - 148 - 85 * t / 470
					});
					s = 0;
					r = 0;
					a = 0;
					o = 0
				} else {
					e(".summary_mobile").hide();
					e(".map").css({
						height : ""
					});
					e(".points").css({
						height : ""
					});
					e(".count_down").css({
						transform : "",
						"-webkit-transform" : ""
					});
					s = -25;
					r = 0;
					if (t < 1440) {
						d = 20
					} else {
						d = 30
					}
				}
				if (isIE) {
					e();
					if (k) {
						k()
					}
				}
			};
			e(window).bind("resize", n);
			var a = -90, o = 0, s = 0, r = 0;
			var d = 25, l = 8;
			var m = false;
			n();
			e("body").bind("mousemove", function(e) {
				if (t < 960) {
					s = 0;
					r = 0
				} else {
					s = (e.clientY / 537 - .75) * 5 - d;
					r = (e.clientX / t - .5) * -l
				}
				if (!m) {
					m = true;
					window.requestAnimationFrame(c)
				}
			});
			var c = function() {
				if (Math.abs(s - a) < .01 && Math.abs(r - o) < .01) {
					a = s;
					o = r;
					m = false
				} else {
					a = (s - a) * .05 + a;
					o = (r - o) * .05 + o
				}
				var t = "rotateX(" + a + "deg) rotateY(" + o + "deg)";
				e(".map_box").css({
					transform : t,
					"-webkit-transform" : t
				});
				if (m) {
					window.requestAnimationFrame(c)
				}
			};
			if (!m) {
				m = true;
				window.requestAnimationFrame(c)
			}
			var p = e(".point").eq(0).clone();
			e(".point").each(function() {
				e(this).css({
					left : Math.random() * 100 + "%",
					bottom : Math.random() * 100 + "%"
				})
			});
			var u = e(document.createElement("div"));
			var f = e(document.createElement("div")).addClass("count_number")
					.append(u.clone().addClass("num_back num_top")).append(
							u.clone().addClass("num_back num_bottom")).append(
							u.clone().addClass("num_front num_top")).append(
							u.clone().addClass("num_front num_bottom"));
			var v = e(".year_box").empty();
			var b = e(".month_box").empty();
			var _ = e(".day_box").empty();
			for (var w = 0; w < 4; w++)
				v.append(f.clone());
			for (var w = 0; w < 2; w++)
				b.append(f.clone());
			for (var w = 0; w < 2; w++)
				_.append(f.clone());
			var h = 0;
			var startDateArr = infoData[0][0].date.split("-");
			var g = new Date(parseInt(startDateArr[0]),
					parseInt(startDateArr[1]) - 1, parseInt(startDateArr[2]));
			// if(g.getMonth()<=2){
			// g = new Date(g.getFullYear(),0,1);
			// } else if(g.getMonth()<=5){
			// g = new Date(g.getFullYear(),3,1);
			// } else if (g.getMonth()<=9)
			// {
			// g = new Date(g.getFullYear(),6,1);
			// } else{
			// g = new Date(g.getFullYear(),9,1);
			// }

			var y = getFormatDate(g);
			var C = e(".count_number");
			for (var w = 0; w < 9; w++)
				C.eq(w).children("div").empty().text(y[w]);
			var D = false;
			var x = e(".summary_mobile>li").eq(0).clone();
			var k = function(i) {
				// if(g.getTime()<-7779744e5)
				// {
				// g=new Date(-7779744e5);
				// h=0
				// }else if(g.getTime()>-7694208e5){
				// g=new Date(-7694208e5);
				// h=99
				// }
				var n = getFormatDate(g);
				for (var a = 7; a >= 0; a--) {
					if (n[a] != y[a]) {
						D = true;
						var o = C.eq(a);
						var s = n[a];
						o.children(".num_back").empty().append(s);
						if (!ltie10) {
							if (i)
								o.addClass("flip_down");
							else
								o.addClass("flip_up");
							o.find("div").bind(
									"transitionend",
									{
										num : s,
										$this : o
									},
									function(e) {
										e.data.$this.children(".num_front")
												.empty().append(e.data.num);
										e.data.$this.removeClass("flip_down")
												.removeClass("flip_up");
										D = false
									})
						} else {
							o.children(".num_front").empty().append(s);
							D = false
						}
					}
				}
				y = n;
				e(".week_list li").removeClass("active");
				T.removeClass("current").eq(h).addClass("current")
						.parents("li").addClass("active");
				if (typeof reFreshPointPosition == "function") {
					reFreshPointPosition(h)
				}
				var r = infoData[h];
				e(".points").empty();
				e(".summary_mobile").hide().empty();
				if (!r)
					r = [];
				for (var a = 0; a < r.length; a++) {
					var d = p.clone().addClass("ing").data("pointData", r[a]);
					if (!isIE || ltie10) {
						if (ltie10) {
							var l = 27.162 * Math.log(450 - r[a].y + 1);
							var m = l * (4 / 3) + (400 - l * (4 / 3)) * 2
									* (r[a].x / 800) * 1.1;
							d.css({
								left : m + "px",
								bottom : l - 25 + "px"
							})
						} else {
							d.css({
								left : r[a].x / 8 + "%",
								bottom : 100 - r[a].y / 4.5 + "%"
							})
						}
					} else {
						if (t >= 1440) {
							d.css({
								"-ms-transform" : "translateZ(-"
										+ (450 - r[a].y) * 1.5
										+ "px) translateX(" + r[a].x * 1.5
										+ "px)",
								"-ms-transform-origin" : (400 - r[a].x) * 1.5
										+ "px bottom " + (450 - r[a].y) * 1.5
										+ "px",
								left : "0",
								bottom : "0"
							})
						} else {
							d.css({
								"-ms-transform" : "translateZ(-"
										+ (450 - r[a].y) + "px) translateX("
										+ r[a].x + "px)",
								"-ms-transform-origin" : 400 - r[a].x
										+ "px bottom " + (450 - r[a].y) + "px",
								left : "0",
								bottom : "0"
							})
						}
					}
					d.find(".pin").empty().append(r[a].area);
					if (r[a].country.length > 3) {
						d.find(".pin").addClass("jsf")
					}
					d
							.bind(
									"mouseenter",
									function(t) {
										e(".summary p")
												.empty()
												.append(
														e(this).data(
																"pointData") == null ? ""
																: e(this)
																		.data(
																				"pointData").contentStr)
									})
							.bind(
									"mouseleave",
									function(t) {
										e(".summary p")
												.empty()
												.append(
														e(this).data(
																"pointData") == null ? ""
																: e(this)
																		.data(
																				"pointData").contentStr)
									}).bind("click", function(t) {
								e(".point.active").removeClass("active");
								e(this).addClass("active")
							});
					var c = x.clone();
					c.find(".sm_area").empty().append(
							r[a].country
									+ (r[a].area != "" ? "-" + r[a].area : ""));
					c.find(".sm_str").empty().append(r[a].contentStr);
					if (r[a].content != null && r[a].content.length > 0
							&& r[a].content[0].contentImg != "") {
						d.find("img").attr("src", r[a].content[0].contentImg);
						c.find("img").attr("src", r[a].content[0].contentImg);
						d.find(".content_img").css({
							opacity : parseFloat(r[a].imgOpacity)
						});
						if (r[a].contentVod != "") {
							d
									.find(".content_img")
									.addClass("ci_vod")
									.bind(
											"click",
											function() {
												// NTES_createVideo({width:"640",
												// height:"360",
												// pltype:"7",
												// topicid:"0001",
												// vid:e(this).parents(".point").data("pointData").contentVodId,
												// sid:"VANHDTLTS",
												// autoplay:true,
												// url_mp4:e(this).parents(".point").data("pointData").contentVod
												// },
												// document.getElementById("ww2_video"));
												document
														.getElementById("ww2_videofm").src = e(
														this).parents(".point")
														.data("pointData").contentVod;
												e(".video_player").removeClass(
														"hide");
												e(".audio_btn").removeClass(
														"playing").addClass(
														"pause")
											})
						} else {
							d
									.find(".content_img")
									.addClass("ci_img")
									.bind(
											"click",
											function() {
												e(".img_viewer")
														.find("img")
														.attr(
																"src",
																e(this)
																		.parents(
																				".point")
																		.data(
																				"pointData") == null ? ""
																		: e(
																				this)
																				.parents(
																						".point")
																				.data(
																						"pointData").content[0].contentImg);
												e(".img_viewer")
														.find(
																".img_str_content")
														.empty()
														.append(
																e(this)
																		.parents(
																				".point")
																		.data(
																				"pointData") == null ? ""
																		: e(
																				this)
																				.parents(
																						".point")
																				.data(
																						"pointData").content[0].contentImgStr);
												ci = e(this).parents(".point")
														.data("pointData").index;
												e(".img_viewer").removeClass(
														"hide");

											})
						}
					} else {
						d.find(".content").remove();
						c.find("img").remove()
					}
					e(".points").append(d);
					e(".summary_mobile").append(c)
				}
				e(".point").eq(0).addClass("active");
				e(".summary p").empty().append(
						e(".point").eq(0).data("pointData") == null ? "" : e(
								".point").eq(0).data("pointData").contentStr);
				e(".point").each(
						function() {
							var t = e(this);
							setTimeout(function() {
								t.removeClass("ing")
							}, parseInt(Math.random()
									* (e(".point").length - 1) * 100))
						});
				if (isIE) {
					e(".points").prepend(e(".map").clone());
					e(".map")[0].style.visibility = "hidden";
					e(".map")[1].style.visibility = ""
				}
				if (t < 960)
					setTimeout(function() {
						e(".summary_mobile").fadeIn(1e3)
					}, 1e3)
			};
			// b.bind("click",function(){
			// var e=g.getTime();
			// g.setMonth(g.getMonth()+1);
			// h+=Math.floor((g.getTime()-e)/(24*3600*1e3));
			// k(true)
			// });
			var I = _.children(".count_number");
			// I.eq(0).bind("click",function(){h+=10;g.setDate(g.getDate()+10);k(true)});
			// I.eq(1).bind("click",function(){h+=1;g.setDate(g.getDate()+1);k(true)});
			e(".next_day").bind("click", function() {
				// h++;g.setDate(g.getDate()+1);k(true)
				if (cacheindex > 0) {
					cacheindex--;
					//cacheInfo.push(infoData);
					infoData = cacheInfo[cacheindex];
					reset(e);
					dmrenderDays(infoData);
					h = 0;
					var startDateArr = infoData[0][0].date.split("-");
					g = new Date(parseInt(startDateArr[0]),
							parseInt(startDateArr[1]) - 1, parseInt(startDateArr[2])) ;
					k(true);
				}
			});
			e(".prev_day")
					.bind(
							"click",
							function() {
								// h--;g.setDate(g.getDate()-1);k(false)

								if (infoData && infoData.length > 0
										&& cacheInfo.length - 1<= cacheindex) {
									$
											.post(
													"http://localhost:9080/rainbow/ShowInfoServilet",
													{
														startdate : infoData[0][0].date
													},
													function(result) {
														if (result
																&& result.length > 0) {
															cacheindex++;
															cacheInfo
																	.push(result);
															infoData = result;
															reset(e);
															dmrenderDays(infoData);
															h = 0;
															var startDateArr = infoData[0][0].date.split("-");
															g = new Date(parseInt(startDateArr[0]),
																	parseInt(startDateArr[1]) - 1, parseInt(startDateArr[2])) ;
															k(false);
														}

													});
								} else {
									cacheindex++;
									infoData = cacheInfo[cacheindex];
									reset(e);
									dmrenderDays(infoData);
									h = 0;
									var startDateArr = infoData[0][0].date.split("-");
									g= new Date(parseInt(startDateArr[0]),
											parseInt(startDateArr[1]) - 1, parseInt(startDateArr[2])) ;
									k(false);
								}
							});
			// e(window).bind("mousewheel",function(e)
			// {
			// e.preventDefault();
			// if(e.deltaY>0)
			// {
			// h--;
			// g.setDate(g.getDate()-1);
			// k(false)
			// }else{
			// h++;
			// g.setDate(g.getDate()+1);
			// k(true)
			// }
			// });
			// e(window).bind("keydown",function(e)
			// {
			// if(e.keyCode==39)
			// {
			// h++;
			// g.setDate(g.getDate()+1);
			// k(true)
			// }else if(e.keyCode==37){
			// h--;
			// g.setDate(g.getDate()-1);
			// k(false)
			// }
			// });
			var T = e(".day_list li:not(.disable)").each(
					function(t) {
						e(this).attr("data-num", t).bind(
								"click",
								function() {
									var t = e(this).attr("data-num") - h;
									// g.setDate(g.getDate()+t);
									// h=parseInt(e(this).attr("data-num"));
									h = parseInt(e(this).attr("data-num"));
									if(!infoData[h])
										return;
									var dateArr = infoData[h][0].date
											.split("-");
									g = new Date(parseInt(dateArr[0]),
											parseInt(dateArr[1]) - 1,
											parseInt(dateArr[2]));

									if (t < 0)
										k(false);
									else
										k(true)
								})
					});
			e(".img_viewer .close_btn").bind("click", function() {
				e(".img_viewer").addClass("hide")
				ii = 0;
			});

			e(".prev_day1").bind(
					"click",
					function() {

						var data1 = infoData[ci][0];
						var imgArr = data1.content;
						if (imgArr.length > 1 && ii > 0) {
							ii--;
							e(".img_viewer").find("img").attr("src",
									imgArr[ii].contentImg);
							e(".img_viewer").find(".img_str_content").empty()
									.append(imgArr[ii].contentImgStr);
						}
					});

			e(".next_day1").bind(
					"click",
					function() {

						var data1 = infoData[ci][0];
						var imgArr = data1.content;
						if (imgArr.length > 1 && ii < imgArr.length - 1) {
							ii++;
							e(".img_viewer").find("img").attr("src",
									imgArr[ii].contentImg);
							e(".img_viewer").find(".img_str_content").empty()
									.append(imgArr[ii].contentImgStr);
						}
					});
			// e(".img_viewer").bind("click",function()
			// {
			// e(".img_viewer").addClass("hide")
			// });
			e(".video_player").bind("mousemove", function(e) {
				e.stopPropagation()
			});
			e(".video_player .close_btn").bind("click", function() {
				document.getElementById("ww2_videofm").src = "";

				e(".video_player").addClass("hide");// .find("#ww2_video").empty();

				e(".audio_btn").removeClass("pause").addClass("playing");
			});
			if (!ltie10) {
				objectFit.polyfill({
					selector : ".iv_img",
					fittype : "contain",
					disableCrossDomain : "false"
				})
			}
			if (t >= 960 && !ltie10) {
				e(".audio_player").show();
				e("#ww2_audio")[0].play()
			}
			e(".mb_audio_btn").bind("click", function() {
				if (e("#ww2_audio")[0].paused) {
					e("#ww2_audio")[0].play();
					e(this).addClass("playing")
				} else {
					e("#ww2_audio")[0].pause();
					e(this).removeClass("playing")
				}
			});
			e(".audio_btn").bind("click", function() {
				if (e("#ww2_audio")[0].paused) {
					e("#ww2_audio")[0].play();
					e(this).addClass("playing")
				} else {
					e("#ww2_audio")[0].pause();
					Se(this).removeClass("playing")
				}
			});
			e(".tb_comment_btn").bind("mouseenter", function() {
				e(".comment_block").addClass("active")
			}).bind("mouseleave", function() {
				setTimeout(function() {
					e(".comment_block").removeClass("active")
				}, 500)
			});
			e(".tb_share_btn").bind("mouseenter", function() {
				e(".tb_share_box").addClass("active")
			}).bind("mouseleave", function() {
				setTimeout(function() {
					e(".tb_share_box").removeClass("active")
				}, 500)
			});
			var q = function(t) {
				if (t == 1) {
					e(".day_list li.current").addClass("lighting");
					t++;
					setTimeout(function() {
						q(2)
					}, 500)
				} else if (t == 2) {
					e(".day_list li.current").removeClass("lighting");
					setTimeout(function() {
						q(1)
					}, 3e3)
				}
			};
			q(1);
			k(true);
			e(".map_container").fadeIn()
		}
		isInited = true;
		console.log("Map Inited!")
	};
	if (e(window).width() < 960) {
		e(".guide_page").remove();

	}
}(jQuery));

$.get("http://localhost:9080/rainbow/ShowInfoServilet", null, function(result) {
	// alert(result);
	infoData = result;
	// mapInit();
	cacheInfo.push(infoData);
	dmrenderDays(infoData);
	// cacheInfo.push(result);
});

function getFormatDate(e) {
	var t = "";
	var i = e.getFullYear();
	var n = e.getMonth() + 1;
	var a = e.getDate();
	t += i;
	if (n >= 10) {
		t += n
	} else {
		t += "0" + n
	}
	if (a >= 10) {
		t += a
	} else {
		t += "0" + a
	}
	return t
}

function reset(e,g) {
	var T = e(".day_list li:not(.disable)");
//	.each(
//			function(t) {
//				e(this).attr("data-num", t).bind(
//						"click",
//						function() {
//							var t = e(this).attr("data-num") - 0;
//							// g.setDate(g.getDate()+t);
//							// h=parseInt(e(this).attr("data-num"));
//							//h = parseInt(e(this).attr("data-num"));
//							var dateArr = infoData[t][0].date
//									.split("-");
//							var og = g.getTime();
//							g = new Date(parseInt(dateArr[0]),
//									parseInt(dateArr[1]) - 1,
//									parseInt(dateArr[2]));
//							
//							if (og < g)
//								k(false);
//							else
//								k(true)
//						})
//			});
	e(".week_list li").removeClass("active");
	T.removeClass("current").eq(0).addClass("current")
			.parents("li").addClass("active");
	var p = e(".point").eq(0).clone();
	var x = e(".summary_mobile>li").eq(0).clone();
	var r = infoData[0];
	e(".points").empty();
	e(".summary_mobile").hide().empty();
	if (!r)
		r = [];
	for (var a = 0; a < r.length; a++) {
		var d = p.clone().addClass("ing").data("pointData", r[a]);
		if (!isIE || ltie10) {
			if (ltie10) {
				var l = 27.162 * Math.log(450 - r[a].y + 1);
				var m = l * (4 / 3) + (400 - l * (4 / 3)) * 2 * (r[a].x / 800)
						* 1.1;
				d.css({
					left : m + "px",
					bottom : l - 25 + "px"
				})
			} else {
				d.css({
					left : r[a].x / 8 + "%",
					bottom : 100 - r[a].y / 4.5 + "%"
				})
			}
		} else {
			if (t >= 1440) {
				d.css({
					"-ms-transform" : "translateZ(-" + (450 - r[a].y) * 1.5
							+ "px) translateX(" + r[a].x * 1.5 + "px)",
					"-ms-transform-origin" : (400 - r[a].x) * 1.5
							+ "px bottom " + (450 - r[a].y) * 1.5 + "px",
					left : "0",
					bottom : "0"
				})
			} else {
				d.css({
					"-ms-transform" : "translateZ(-" + (450 - r[a].y)
							+ "px) translateX(" + r[a].x + "px)",
					"-ms-transform-origin" : 400 - r[a].x + "px bottom "
							+ (450 - r[a].y) + "px",
					left : "0",
					bottom : "0"
				})
			}
		}
		d.find(".pin").empty().append(r[a].area);
		if (r[a].country.length > 3) {
			d.find(".pin").addClass("jsf")
		}
		d.bind(
				"mouseenter",
				function(t) {
					e(".summary p").empty().append(
							e(this).data("pointData") == null ? "" : e(this)
									.data("pointData").contentStr)
				}).bind(
				"mouseleave",
				function(t) {
					e(".summary p").empty().append(
							e(this).data("pointData") == null ? "" : e(this)
									.data("pointData").contentStr)
				}).bind("click", function(t) {
			e(".point.active").removeClass("active");
			e(this).addClass("active")
		});
		var c = x.clone();
		c.find(".sm_area").empty().append(
				r[a].country + (r[a].area != "" ? "-" + r[a].area : ""));
		c.find(".sm_str").empty().append(r[a].contentStr);
		if (r[a].content != null && r[a].content.length > 0
				&& r[a].content[0].contentImg != "") {
			d.find("img").attr("src", r[a].content[0].contentImg);
			c.find("img").attr("src", r[a].content[0].contentImg);
			d.find(".content_img").css({
				opacity : parseFloat(r[a].imgOpacity)
			});
			if (r[a].contentVod != "") {
				d
						.find(".content_img")
						.addClass("ci_vod")
						.bind(
								"click",
								function() {
									// NTES_createVideo({width:"640",
									// height:"360",
									// pltype:"7",
									// topicid:"0001",
									// vid:e(this).parents(".point").data("pointData").contentVodId,
									// sid:"VANHDTLTS",
									// autoplay:true,
									// url_mp4:e(this).parents(".point").data("pointData").contentVod
									// },
									// document.getElementById("ww2_video"));
									document.getElementById("ww2_videofm").src = e(
											this).parents(".point").data(
											"pointData").contentVod;
									e(".video_player").removeClass("hide");
									e(".audio_btn").removeClass("playing")
											.addClass("pause")
								})
			} else {
				d
						.find(".content_img")
						.addClass("ci_img")
						.bind(
								"click",
								function() {
									e(".img_viewer")
											.find("img")
											.attr(
													"src",
													e(this).parents(".point")
															.data("pointData") == null ? ""
															: e(this)
																	.parents(
																			".point")
																	.data(
																			"pointData").content[0].contentImg);
									e(".img_viewer")
											.find(".img_str_content")
											.empty()
											.append(
													e(this).parents(".point")
															.data("pointData") == null ? ""
															: e(this)
																	.parents(
																			".point")
																	.data(
																			"pointData").content[0].contentImgStr);
									ci = e(this).parents(".point").data(
											"pointData").index;
									e(".img_viewer").removeClass("hide");

								})
			}
		} else {
			d.find(".content").remove();
			c.find("img").remove()
		}
		e(".points").append(d);
		e(".summary_mobile").append(c);
		
	}
}

var ci = 0;
var ii = 0;
var cacheInfo = new Array();
var cacheindex = 0;