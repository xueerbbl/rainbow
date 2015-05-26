package com.maple.rainbow.bean;

import java.util.ArrayList;
import java.util.List;


public class DayInfo {
	
	private int id;
	private int index = 0;
	private String title = "标题";
	private String date = "0000-00-00";
	private String country = "中国";
	private String area = "杭州";
	private String x = "0";
	private String y = "0";
	private String contentStr = "简介";
	private String contentVodId = "";
	private String contentVod = "";
	private String contentAudio = "";
	private String contentLnk = "";
	private String imgOpacity = "0.5";
	private List<ImgInfo> content = new ArrayList<ImgInfo>();

	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getContentStr() {
		return contentStr;
	}

	public void setContentStr(String contentStr) {
		this.contentStr = contentStr;
	}

	public String getContentVodId() {
		return contentVodId;
	}

	public void setContentVodId(String contentVodId) {
		this.contentVodId = contentVodId;
	}

	public String getContentVod() {
		return contentVod;
	}

	public void setContentVod(String contentVod) {
		this.contentVod = contentVod;
	}

	public String getContentAudio() {
		return contentAudio;
	}

	public void setContentAudio(String contentAudio) {
		this.contentAudio = contentAudio;
	}

	public String getContentLnk() {
		return contentLnk;
	}

	public void setContentLnk(String contentLnk) {
		this.contentLnk = contentLnk;
	}

	public String getImgOpacity() {
		return imgOpacity;
	}

	public void setImgOpacity(String imgOpacity) {
		this.imgOpacity = imgOpacity;
	}

	public List<ImgInfo> getContent() {
		return content;
	}

	public void setContent(List<ImgInfo> content) {
		this.content = content;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}



}
