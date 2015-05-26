package com.maple.rainbow.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import com.maple.rainbow.bean.DayInfo;
import com.maple.rainbow.bean.ImgInfo;

public class BaseInfoDao extends JdbcDaoSupport {

	public List<DayInfo> queryLast15Info() {

		String sql = "select bi.id, bi.title,bi.date,bi.country,bi.area,bi.contentStr,contentVod, ii.content,"
				+ "i.id as iid,i.type from (select * from baseinfo order by date desc limit 0,15) bi,imginfo ii,img i "
				+ "where bi.id = ii.dayId and ii.imgid = i.id and bi.delete!=1 and  ii.delete!=1 and i.delete!=1 order by date asc";
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<DayInfo> resultList = getJdbcTemplate().query(sql, new RowMapper<DayInfo>() {

			@Override
			public DayInfo mapRow(ResultSet arg0, int arg1) throws SQLException {
				int id = arg0.getInt("id");
				String title = arg0.getString("title");
				Date date = arg0.getDate("date");
				String dateStr = sdf.format(date);
				String country = arg0.getString("country");
				String area = arg0.getString("area");
				String contentStr = arg0.getString("contentStr");
				String contentVod = arg0.getString("contentVod");
				String content = arg0.getString("content");
				String src = arg0.getString("iid") + "."+ arg0.getString("type");
				DayInfo info = new DayInfo();
				info.setTitle(title);
				info.setId(id);
				info.setDate(dateStr);
				info.setCountry(country);
				info.setArea(area);
				info.setContentStr(contentStr);
				info.setContentVod(contentVod);
				info.setContent(new ArrayList<ImgInfo>());
				ImgInfo imgInfo = new ImgInfo();
				imgInfo.setContentImg(src);
				imgInfo.setContentImgStr(content);
				info.getContent().add(imgInfo);
				return info;
			}
		});
		List<DayInfo> filterList = new ArrayList<DayInfo>();
		Map<String,DayInfo> map = new HashMap<String,DayInfo>();
		for (DayInfo dayInfo : resultList) {
			if(map.containsKey(String.valueOf(dayInfo.getId()))){
				map.get(String.valueOf(dayInfo.getId())).getContent().add(dayInfo.getContent().get(0));
			} else {
				filterList.add(dayInfo);
				map.put(String.valueOf(dayInfo.getId()), dayInfo);
			}
		}
		return filterList;
	}

	public List<DayInfo> queryLast15Info(String startDate) {
		String sql = "select bi.id, bi.title,bi.date,bi.country,bi.area,bi.contentStr,contentVod, ii.content,"
				+ "i.id as iid,i.type from (select * from baseinfo where date < '"+startDate+"' order by date desc limit 0,15) bi,imginfo ii,img i "
				+ "where bi.id = ii.dayId and ii.imgid = i.id and bi.delete!=1 and  ii.delete!=1 and i.delete!=1 order by date asc";
		final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<DayInfo> resultList = getJdbcTemplate().query(sql, new RowMapper<DayInfo>() {

			@Override
			public DayInfo mapRow(ResultSet arg0, int arg1) throws SQLException {
				int id = arg0.getInt("id");
				String title = arg0.getString("title");
				Date date = arg0.getDate("date");
				String dateStr = sdf.format(date);
				String country = arg0.getString("country");
				String area = arg0.getString("area");
				String contentStr = arg0.getString("contentStr");
				String contentVod = arg0.getString("contentVod");
				String content = arg0.getString("content");
				String src = "pic/"+arg0.getString("iid") + "."+ arg0.getString("type");
				DayInfo info = new DayInfo();
				info.setTitle(title);
				info.setId(id);
				info.setDate(dateStr);
				info.setCountry(country);
				info.setArea(area);
				info.setContentStr(contentStr);
				info.setContentVod(contentVod);
				info.setContent(new ArrayList<ImgInfo>());
				ImgInfo imgInfo = new ImgInfo();
				imgInfo.setContentImg(src);
				imgInfo.setContentImgStr(content);
				info.getContent().add(imgInfo);
				return info;
			}
		});
		List<DayInfo> filterList = new ArrayList<DayInfo>();
		Map<String,DayInfo> map = new HashMap<String,DayInfo>();
		for (DayInfo dayInfo : resultList) {
			if(map.containsKey(String.valueOf(dayInfo.getId()))){
				map.get(String.valueOf(dayInfo.getId())).getContent().add(dayInfo.getContent().get(0));
			} else {
				filterList.add(dayInfo);
				map.put(String.valueOf(dayInfo.getId()), dayInfo);
			}
		}
		return filterList;
	}

}
